import { useState } from 'react';
import API from '../api';

export default function SearchForm({ setResults, onSearchComplete }) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await API.get(`/search/media?q=${query}`);
      setResults(res.data.results || []);

      // Save to localStorage history
      const existing = JSON.parse(localStorage.getItem('history')) || [];
      const newHistory = [query, ...existing.filter(item => item !== query)].slice(0, 10);
      localStorage.setItem('history', JSON.stringify(newHistory));

      // Notify parent to refresh HistoryList
      onSearchComplete?.();
    } catch (err) {
      alert('Search failed.');
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        className="p-2 border rounded w-full mb-2"
        placeholder="Search media..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
        Search
      </button>
    </form>
  );
}

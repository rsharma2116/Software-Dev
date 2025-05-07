import { useState, useEffect } from 'react';
import API from './api';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SearchForm from './components/SearchForm';
import MediaResults from './components/MediaResults';
import HistoryList from './components/HistoryList';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [results, setResults] = useState([]);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);
  const [showAbout, setShowAbout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setResults([]);
  };

  const handleHistorySearch = async (query) => {
    try {
      const res = await API.get(`/search/media?q=${query}`);
      setResults(res.data.results || []);
    } catch (error) {
      console.error('Search failed from history:', error);
    }
  };

  useEffect(() => {
    document.title = 'Openverse Media Search';
  }, []);

  if (!loggedIn) {
    return (
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
        style={{ backgroundImage: "url('/login-bg.jpg')" }}
      >
        <div className="bg-blue-500 bg-opacity-80 p-10 md:p-12 rounded-lg shadow-xl w-full max-w-lg text-white">
          {/* Inactive Buttons + Active About Us */}
          <div className="flex flex-wrap justify-between gap-2 mb-6">
            <button className="flex-1 bg-gray-300 text-gray-700 py-2 rounded cursor-not-allowed opacity-70">
              HomePage
            </button>
            <button className="flex-1 bg-gray-300 text-gray-700 py-2 rounded cursor-not-allowed opacity-70">
              Print
            </button>
            <button className="flex-1 bg-gray-300 text-gray-700 py-2 rounded cursor-not-allowed opacity-70">
              Price
            </button>
            <button
              className="flex-1 bg-white text-blue-800 font-semibold py-2 rounded hover:bg-blue-100 transition"
              onClick={() => setShowAbout(true)}
            >
              About Us
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-6 text-center">OPENVERSE LOGIN</h1>
          <RegisterForm />
          <LoginForm onLogin={() => setLoggedIn(true)} />

          {showAbout && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">About Us</h2>
                <p className="mb-4">
                  Welcome to Openverse! This platform allows you to search and explore openly licensed media.
                </p>
                <button
                  onClick={() => setShowAbout(false)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('/search-bg.jpg')" }}
    >
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-800">Openverse Media Search</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        </div>

        <SearchForm
          setResults={setResults}
          onSearchComplete={() => setHistoryRefreshKey(prev => prev + 1)}
        />

        {results.length > 0 && <MediaResults results={results} />}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Recent Searches</h2>
          <HistoryList key={historyRefreshKey} onSelectHistory={handleHistorySearch} />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

export default function HistoryList({ onSelectHistory }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('history')) || [];
    setHistory(stored);
  }, []);

  return (
    <ul className="list-disc pl-5 text-blue-700">
      {history.length === 0 ? (
        <li className="italic text-gray-500">No recent searches</li>
      ) : (
        history.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer hover:underline"
            onClick={() => onSelectHistory?.(item)}
          >
            {item}
          </li>
        ))
      )}
    </ul>
  );
}

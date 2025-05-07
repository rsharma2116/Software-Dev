export default function MediaResults({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {results.map((item) => (
        <div key={item.id} className="border p-2 rounded">
          <img src={item.thumbnail} alt={item.title || 'Media'} className="w-full h-40 object-cover mb-2" />
          <p className="text-sm truncate">{item.title || 'Untitled'}</p>
          <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-500 text-xs">
            View source
          </a>
        </div>
      ))}
    </div>
  );
}

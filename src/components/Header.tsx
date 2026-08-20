interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  showVisited: boolean;
  onToggleShowVisited: () => void;
  onAdd: () => void;
}

export default function Header({ search, onSearchChange, showVisited, onToggleShowVisited, onAdd }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__top">
        <h1>🍜 My Singapore Food Map</h1>
        <button className="btn-add" onClick={onAdd} aria-label="Add food place">
          +
        </button>
      </div>
      <div className="app-header__controls">
        <input
          className="search-input"
          type="search"
          placeholder="🔍 Search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <label className="visited-toggle">
          <input type="checkbox" checked={showVisited} onChange={onToggleShowVisited} />
          Show visited
        </label>
      </div>
    </header>
  );
}

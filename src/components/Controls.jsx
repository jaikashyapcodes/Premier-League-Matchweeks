export default function MatchControls({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  minGoalsFilter,
  setMinGoalsFilter
}) {
  return (
    <div className="controls">
      
      <input
        type="text"
        placeholder="Search teams..."
        className="input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="input"
      >
        <option value="">Sort</option>
        <option value="goals-desc">Goals (High → Low)</option>
      </select>

      <input
        type="number"
        placeholder="Min goals"
        className="input w-24"
        value={minGoalsFilter}
        onChange={(e) => setMinGoalsFilter(e.target.value)}
      />
    </div>
  );
}
export default function MatchControls({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  minGoalsFilter,
  setMinGoalsFilter
}) {
  return (
    <div className="flex gap-2 p-3 flex-wrap">
      <input
        className="border px-2 py-1"
        placeholder="Search teams"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select
        className="border px-2 py-1"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Sort</option>
        <option value="goals-desc">Goals</option>
      </select>

      <input
        className="border px-2 py-1 w-24"
        type="number"
        placeholder="Min goals"
        value={minGoalsFilter}
        onChange={(e) => setMinGoalsFilter(e.target.value)}
      />
    </div>
  );
}
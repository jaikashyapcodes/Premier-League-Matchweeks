import { useEffect, useState } from "react";
import MatchRow from "./components/MatchRow";
import MatchControls from "./components/Controls";
import ThemeSwitcher from "./components/ThemeToggle";
import { extractMatchesFromText } from "./utils/parseMatches";

// IMPORTANT: only works in Vite
import rawMatchData from "./data/matches.txt?raw";

export default function App() {
  // all matches from dataset
  const [allMatches, setAllMatches] = useState([]);

  // UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [minGoalsFilter, setMinGoalsFilter] = useState("");

  // ✅ dark mode (this was your error)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // load + parse dataset once
  useEffect(() => {
    try {
      const parsedMatches = extractMatchesFromText(rawMatchData);
      setAllMatches(parsedMatches);
    } catch (error) {
      console.error("Parsing failed:", error);
    }
  }, []);

  // apply search + filter + sort
  const visibleMatches = allMatches
    .filter((match) => {
      const teams =
        `${match.homeTeamName} ${match.awayTeamName}`.toLowerCase();

      return teams.includes(searchQuery.toLowerCase());
    })
    .filter((match) => {
      if (!minGoalsFilter) return true;
      return match.totalGoals >= Number(minGoalsFilter);
    })
    .sort((a, b) => {
      if (sortOption === "goals-desc") {
        return b.totalGoals - a.totalGoals;
      }
      return 0;
    });

  return (
    <div className={isDarkMode ? "app-container dark" : "app-container"}>
      <div className="page-wrapper">

        {/* HEADER */}
        <div className="header">
          <h1 className="text-lg font-semibold">
            Premier League Matches
          </h1>

          <ThemeSwitcher
            isDarkMode={isDarkMode}
            toggleTheme={() => setIsDarkMode(!isDarkMode)}
          />
        </div>

        {/* CONTROLS */}
        <MatchControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
          minGoalsFilter={minGoalsFilter}
          setMinGoalsFilter={setMinGoalsFilter}
        />

        {/* MATCH LIST */}
        <div className="match-list">
          {visibleMatches.length === 0 ? (
            <div className="px-3 py-4 text-sm text-neutral-500">
              No matches found
            </div>
          ) : (
            visibleMatches.map((match, index) => (
              <MatchRow key={index} matchData={match} />
            ))
          )}
        </div>

      </div>
    </div>
  );
}
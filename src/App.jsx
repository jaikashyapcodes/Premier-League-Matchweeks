import { useEffect, useState } from "react";
import MatchRow from "./components/MatchRow";
import MatchControls from "./components/Controls";
import ThemeSwitcher from "./components/ThemeToggle";
import { extractMatchesFromText } from "./utils/parseMatches";
import rawMatchData from "./data/matches.txt?raw";

export default function App() {
  const [allMatches, setAllMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [minGoalsFilter, setMinGoalsFilter] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const parsed = extractMatchesFromText(rawMatchData);
    setAllMatches(parsed);
  }, []);

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
        return (b.totalGoals || 0) - (a.totalGoals || 0);
      }
      return 0;
    });

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#0f172a" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#000000",
        minHeight: "100vh"
      }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center p-3">
          <h1>Premier League Matches</h1>
          <ThemeSwitcher
            isDarkMode={isDarkMode}
            toggleTheme={() => setIsDarkMode(!isDarkMode)}
          />
        </div>

        <MatchControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
          minGoalsFilter={minGoalsFilter}
          setMinGoalsFilter={setMinGoalsFilter}
        />

        <div>
          {visibleMatches.map((match, index) => (
            <MatchRow key={index} matchData={match} />
          ))}
        </div>
      </div>
    </div>
  );
}
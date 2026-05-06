export default function MatchRow({ matchData }) {
  return (
    <div className="flex justify-between items-center px-3 py-2 border-b">
      <div className="w-16 opacity-70">{matchData.time}</div>

      <div className="flex-1 flex justify-between">
        <span className="text-right flex-1 pr-2">
          {matchData.homeTeamName}
        </span>

        <span className="px-2 font-semibold">
          {matchData.homeScore !== null
            ? `${matchData.homeScore} - ${matchData.awayScore}`
            : "vs"}
        </span>

        <span className="flex-1 pl-2">
          {matchData.awayTeamName}
        </span>
      </div>

      <div className="w-12 text-right opacity-60">
        {matchData.totalGoals !== null ? `${matchData.totalGoals}g` : ""}
      </div>
    </div>
  );
}
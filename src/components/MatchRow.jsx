export default function MatchRow({ matchData }) {
  return (
    <div className="match-row">
      
      <div className="time">
        {matchData.time}
      </div>

      <div className="teams">
        
        <span className="home-team">
          {matchData.homeTeamName}
        </span>

        <span className="score">
          {matchData.homeScore} - {matchData.awayScore}
        </span>

        <span className="away-team">
          {matchData.awayTeamName}
        </span>
      </div>

      <div className="goals">
        {matchData.totalGoals}g
      </div>
    </div>
  );
}
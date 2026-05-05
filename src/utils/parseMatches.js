export function extractMatchesFromText(fileText) {
  const lines = fileText.split("\n");
  const parsedMatches = [];

  let currentMatchDate = "";

  const matchLinePattern = /(\d{1,2}\.\d{2})\s+(.*?)\s+v\s+(.*?)\s+(\d+-\d+)/;

  for (let rawLine of lines) {
    const line = rawLine.trim();

    if (/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/.test(line)) {
      currentMatchDate = line;
      continue;
    }

    const matchResult = line.match(matchLinePattern);

    if (matchResult) {
      const [, kickoffTime, homeTeam, awayTeam, score] = matchResult;

      const [homeScore, awayScore] = score.split("-").map(Number);

      parsedMatches.push({
        date: currentMatchDate,
        time: kickoffTime,
        homeTeamName: homeTeam,
        awayTeamName: awayTeam,
        homeScore,
        awayScore,
        totalGoals: homeScore + awayScore
      });
    }
  }

  return parsedMatches;
}
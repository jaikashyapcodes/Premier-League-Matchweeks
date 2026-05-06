export function extractMatchesFromText(fileText) {
  const lines = fileText.split("\n");
  const matches = [];

  let currentDate = "";

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) continue; // !line denotes the line is empty

    // detect date
    if (days.some(day => line.startsWith(day))) {
      currentDate = line;
      continue;
    }

    const parts = line.split(" ");

    const time = parts[0];
    const vsIndex = parts.indexOf("v"); // finds letter v in dataset as all matches have 'v' in it

    if (vsIndex === -1) continue;

    // 👉 find score safely (look for something like "2-1")
    const scorePart = parts.find(p => p.includes("-") && !isNaN(p.split("-")[0]));

    let homeScore = null;
    let awayScore = null;
    let totalGoals = null;

    if (scorePart) {
      const scores = scorePart.split("-");

      homeScore = Number(scores[0]);
      awayScore = Number(scores[1]);

      // only calculate if valid numbers
      if (!isNaN(homeScore) && !isNaN(awayScore)) {
        totalGoals = homeScore + awayScore;
      }
    }

    // extract teams
    const homeTeamName = parts.slice(1, vsIndex).join(" ");
    const awayTeamName = parts
      .slice(vsIndex + 1, scorePart ? parts.indexOf(scorePart) : parts.length)
      .join(" ");

    matches.push({
      date: currentDate,
      time,
      homeTeamName,
      awayTeamName,
      homeScore,
      awayScore,
      totalGoals
    });
  }

  return matches;
}
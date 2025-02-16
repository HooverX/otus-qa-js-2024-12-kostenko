function getScore(scores) {
  let sum = 0;

  for (let key in scores) {
    sum += scores[key]
  }

  return sum;
}

const scores = {
  Ivan: 50,
  Oleg: 70,
  Ann: 6,
};

const totalScore = getScore(scores)

console.log(totalScore)
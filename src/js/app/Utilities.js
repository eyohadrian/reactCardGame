function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function formattedKeyword(keyword) {
    return keyword.replace(" ", "+");
}

function formattedTime(time) {
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const mili = time.getMilliseconds();

  return `${minutes}:${seconds}.${mili}`
}

export {
  randomBetween,
  formattedKeyword,
  formattedTime
};

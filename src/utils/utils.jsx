const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

const generateReferenceNumber = () => {
  let reference = "";
  const characters = "0123456789";
  const length = 6;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    reference += characters[randomIndex];
  }
  return reference;
}

export {
	range,
  generateReferenceNumber
}
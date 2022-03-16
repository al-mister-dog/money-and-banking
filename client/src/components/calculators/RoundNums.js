const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};
const roundToMillion = (num) => {
  if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "Tn";
  } else if (num > 10000) {
    return Math.round(num / 100) / 10 + "Bn";
  } else {
    return Math.round(num / 1000) / 10 + "Mn";
  }
};
const roundedTril = (num) => {
  if (num > 1000) {
    return Math.round(num / 100) / 10 + "Tn";
  } else if (num > 100) {
    return Math.round(num / 10) / 10 + "Bn";
  } else {
    return Math.round(num / 100) / 10 + "Mn";
  }
};
const roundToBillion = (num) => {
  if (num > 1000) {
    return Math.round(num / 100) / 10 + "Tn";
  } else if (num > 100) {
    return Math.round(num) + "Bn";
  } else if (num > 10) {
    return Math.round(num) + "Bn";
  } else if (num > 1) {
    return Math.round(num) + "Bn";
  } else {
    return num + "Mn"
  }
};

module.exports = {roundToMillion, roundToBillion}
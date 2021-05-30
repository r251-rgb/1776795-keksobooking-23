//первый вариант
function getRandomInteger(minValue, maxValue) {
  return ~~(Math.random() * (maxValue - minValue + 1) + minValue);
}
//второй вариант
const getRandomInteger1 = (minValue, maxValue) => ~~(Math.random() * (maxValue - minValue + 1) + minValue);


getRandomInteger(1,10);
getRandomInteger1(1,10);

//вторая функция
const getRandomFloat = (minValue, maxValue, numberAfterDecimal) => (Math.random() * (maxValue - minValue) + minValue).toFixed(numberAfterDecimal);

getRandomFloat(1.2345,10,5);

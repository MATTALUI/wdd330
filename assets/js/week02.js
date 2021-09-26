(() => {
  const errorMessage = '<span class="error">Your input is invalid.</span>';
  const isValidNumber = input => !isNaN(+input) && +input >= 0;
  const factor = num => num > 0 ? num + factor(num - 1) : 0;
  const getNum = sel => +document.querySelector(sel).value;
  const setIfValid = (sel, val) => document.querySelector(sel).innerHTML = isValidNumber(val)
    ? `<span>${val}</span>`
    : errorMessage;
  const echo = e => document.querySelector('#echo-results').innerHTML =
    `<span>${document.querySelector('#echo').value}</span>`;
  const sumInSeries = e => isValidNumber(getNum('#series'))
    ? setIfValid('#sum-in-series-results', factor(getNum('#series')))
    : setIfValid('#sum-in-series-results', undefined);
  const sumTwo = e => setIfValid('#sum-two-results', getNum('#add1') + getNum('#add2'));

  document.querySelector('#submit-series').addEventListener('click', sumInSeries);
  document.querySelector('#submit-echo').addEventListener('click', echo);
  document.querySelector('#submit-add').addEventListener('click', sumTwo);
})();

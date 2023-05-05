const btn = document.querySelector("#historical-rates");
const histData = document.querySelector(".historical-data");
const fromDateElm = document.querySelector(".from-date");
const endDateElm = document.querySelector(".to-date");

const fromElm = document.querySelector("#base-currency");
const toElm = document.querySelector("#target-currency");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  fromDate = fromDateElm.value;
  baseCurr = fromElm.value;
  targetCurr = toElm.value;

  if (!fromDate || !baseCurr || !targetCurr) {
    alert("please enter a date");
  } else {
    getHistoricalData(fromDate, endDate, baseCurr, targetCurr);
  }
});

let getHistoricalData = async (fromDate, endDate, base, target) => {
  try {
    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/timeseries?start_date=${fromDate}&end_date=${endDate}&base=${base}&symbols=${target}`,
      requestOptions
    );
    let data = await response.json();
    let index = Object.keys(data.rates).length;

    let dataRatesKey = Object.keys(data.rates);

    for (i = 0; i < index; i++) {
      console.log(Object.keys(data.rates)[index]);
    }

    let rateData = Object.keys(data.rates)[0];
    console.log(rateData);

    html = `<p> Historical exchange rate on ${fromDate} is 1${base} :  ${data.rates[
      dataRatesKey
    ].toFixed(2)} ${target}</p>`;

    histData.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};

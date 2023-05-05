const btn = document.querySelector("#historical-rates");
const histData = document.querySelector(".historical-data");
const fromDateElm = document.querySelector(".from-date");

const fromElm = document.querySelector("#base-currency");
const toElm = document.querySelector("#target-currency");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  fromDate = fromDateElm.value;

  baseCurr = fromElm.value;
  targetCurr = toElm.value;
  getHistoricalData(fromDate, baseCurr, targetCurr);
});

let getHistoricalData = async (fromDate, base, target) => {
  try {
    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/${fromDate}?symbols=${target}&base=${base}`,
      requestOptions
    );
    let data = await response.json();
    let dataRatesKey = Object.keys(data.rates)[0];

    console.log(data);

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

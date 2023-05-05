// Get DOM Elements.

const inputElm = document.querySelector("#amount");
console.log(inputElm.value);
const result = document.querySelector("#converted-amount");
const exchangeRateElm = document.querySelector(".rate");

let myHeaders = new Headers();
myHeaders.append("apikey", "Qewc4IxqSo870EeRi8FcCqdGet40ASeJ");

let requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

async function convertCurrency(from, to) {
  const response = await fetch(
    "https://api.apilayer.com/exchangerates_data/convert?to=" +
      to +
      "&from=" +
      from +
      "&amount=1",
    requestOptions
  );
  let data = await response.json();
  console.log(data);
  if (response.status === 200) {
    let exchangeRate = data.info.rate;
    const amount = inputElm.value;
    console.log("Exchange Rate", exchangeRate);
    if (amount == "" || amount == 0) {
      console.log("Enter valid amount");
    } else {
      let convertedCurrency = amount * exchangeRate;
      exchangeRateElm.innerHTML = `Exchange rate from ${from} to ${to} is ${parseFloat(
        exchangeRate.toFixed(5)
      )}`;

      if (convertedCurrency < 1) {
        result.innerHTML = convertedCurrency;
      } else {
        result.innerHTML = parseFloat(convertedCurrency.toFixed(2));
      }
    }
  } else {
    console.log("Error");
  }
}
const submitElm = document.querySelector("#submit");
submitElm.addEventListener("click", (e) => {
  e.preventDefault();
  result.innerHTML = "";
  console.log("Amount entered", inputElm.value);
  let from = document.querySelector("#base-currency").value;
  let to = document.querySelector("#target-currency").value;
  convertCurrency(from, to);
});

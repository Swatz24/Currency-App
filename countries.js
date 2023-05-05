// DOM element dropdown list.

const currencyListElm = document.querySelectorAll(".converter select");

// Function to fetch the list of currencies supported by the API

const getCurrency = async () => {
  try {
    const response = await fetch(
      "https://api.apilayer.com/exchangerates_data/symbols",
      requestOptions
    );
    let data = await response.json();
    //console.log(data); // To check the result of the fetch .
    console.log(data);
    // Extracting the currency list as objects and storing it in a variable.

    let currencyList = data.symbols;

    console.log(currencyList); // Extracting just the currencyList from the fetched dat and displaying it in console to check.

    for (let i = 0; i < currencyListElm.length; i++) {
      // Extracting just the 3 digit country code from the currencyList Object and using that as values in the select dropdowns.
      for (currency_code in currencyList) {
        //  console.log(currency_code);

        // Selecting default option in dropdown by assigning it to selected variable and adding it to the <option> tag.

        let selected;
        if (i == 0) {
          selected = currency_code == "USD" ? "selected" : "";
        } else if ((i = 1)) {
          selected = currency_code == "INR" ? "selected" : "";
        }

        // Creating Option Tag with currency_code as text and value.
        let optionTag = `<option value = "${currency_code}" ${selected}>${currency_code}</option>`;

        //Insert optionTag inside the select Tag
        currencyListElm[i].insertAdjacentHTML("beforeend", optionTag);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  getCurrency();
});

const save = document.querySelector("#save-favorite");
const currencyPairs = document.querySelector("#favorite-currency-pairs");

const base = document.querySelector("#base-currency");
const target = document.querySelector("#target-currency");

let addButtonsToStorage = (base, target) => {
  let buttons = JSON.parse(localStorage.getItem("buttons"));
  if (!buttons) {
    buttons = [];
    localStorage.setItem("buttons", JSON.stringify(buttons));
  }
  // let buttons = JSON.parse(localStorage.getItem("buttons"));

  let btnObj = {
    base: base,
    target: target,
  };

  buttons.push(btnObj);
  createFavButton(btnObj.base, btnObj.target);

  localStorage.setItem("buttons", JSON.stringify(buttons));
};

let createFavButton = (base, target) => {
  let button = document.createElement("button");
  button.innerHTML = `${base}=>${target}`;
  button.id = `${base}-${target}`;
  currencyPairs.appendChild(button);
};

save.addEventListener("click", (event) => {
  event.preventDefault();
  addButtonsToStorage(base.value, target.value);
  addEventListenerToFavButtons(currencyPairs);
});

let addEventListenerToFavButtons = (div) => {
  if (div.hasChildNodes()) {
    div.childNodes.forEach((childNode) => {
      childNode.addEventListener("click", (event) => {
        event.preventDefault();
        let favCurrencyPair = childNode.id.split("-");
        base.value = favCurrencyPair[0];
        target.value = favCurrencyPair[1];
      });
    });
  }
};

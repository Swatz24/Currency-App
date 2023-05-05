const save = document.querySelector("#save-favorite");
const currencyPairs = document.querySelector("#favorite-currency-pairs");

const base = document.querySelector("#base-currency");
const target = document.querySelector("#target-currency");

let buttons = JSON.parse(localStorage.getItem("buttons"));
if (!buttons) {
  buttons = [];
  localStorage.setItem("buttons", JSON.stringify(buttons));
}
if (buttons.length) {
  loadButtons(buttons);
  FavButtons(currencyPairs);
}

let addButtonsToStorage = (base, target) => {
  // let buttons = JSON.parse(localStorage.getItem("buttons"));
  let buttons = JSON.parse(localStorage.getItem("buttons"));
  let btnObj = {
    base: base,
    target: target,
  };

  buttons.push(btnObj);
  createFavButton(btnObj.base, btnObj.target);

  localStorage.setItem("buttons", JSON.stringify(buttons));
};

function createFavButton(base, target) {
  let button = document.createElement("button");
  button.innerHTML = `${base}=>${target}`;
  button.id = `${base}-${target}`;
  currencyPairs.appendChild(button);
}

save.addEventListener("click", (event) => {
  event.preventDefault();
  addButtonsToStorage(base.value, target.value);
  FavButtons(currencyPairs);
});

function FavButtons(div) {
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
}

function loadButtons(buttons) {
  if (buttons.length) {
    buttons.forEach((button) => {
      createFavButton(button.base, button.target);
    });
  }
}

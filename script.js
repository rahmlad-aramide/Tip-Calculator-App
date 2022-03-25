const buttons = document.querySelectorAll("[data-number]");
const price = document.querySelector("[data-price]");
const people = document.querySelector("[data-people]");
const custom = document.querySelector("[data-custom]");
const tipVal = document.querySelector(".tipValue");
const totalVal = document.querySelector(".totalValue");
const reset = document.querySelector(".reset");

let textContents = () => {
  totalVal.textContent = "0.00";
  tipVal.textContent = "0.00";
};

let defaultValue = () => {
  textContents();
  custom.value = "";
};

let zero = () => {
  if (people.value == "" || people.value == 0) {
    defaultValue();
  }
};
let infinite = (val) => {
  if (val === Infinity) {
    textContents();
  }
};
let nan = (val) => {
  if (val === NaN) {
    textContents();
  }
};

const calcTipValue = (percent, price, people) =>
  (percent * price.value) / people.value;

const calcTotalValue = (percent, price, people) =>
  ((percent + 1) * price.value) / people.value;

let finalValues = function (a) {
  let percent = Number(a / 100);
  let calcTip = calcTipValue(percent, price, people);
  tipVal.textContent = `${calcTip.toFixed(2)}`;
  nan(calcTip);
  infinite(calcTip);
  let calcTotal = calcTotalValue(percent, price, people);
  totalVal.textContent = `${calcTotal.toFixed(2)}`;
  nan(calcTotal);
  infinite(calcTotal);
};

buttons.forEach((button) =>
  button.addEventListener("click", function () {
    button.classList.add(".active");
    let number = button.innerText;
    let percent = Number(number.slice(0, -1));
    finalValues(percent);
  })
);

custom.addEventListener("keyup", (Event) => {
  Event.preventDefault();
  if ((Event.key >= "0" && Event.key <= "9") || Event.key == "Backspace") {
    finalValues(custom.value);
  }
});

custom.addEventListener("change", () => {
  finalValues(custom.value);
});

people.addEventListener("keyup", (Event) => {
  Event.preventDefault();
  if (
    (Event.key >= "0" && Event.key <= "9") ||
    Event.key == "Backspace" ||
    Event.key == "Enter"
  ) {
    finalValues(custom.value);
    zero();
  }
});

people.addEventListener("change", () => {
  finalValues(custom.value);
  zero();
});

price.addEventListener("keyup", (Event) => {
  Event.preventDefault();
  if (
    (Event.key >= "0" && Event.key <= "9") ||
    Event.key == "Backspace" ||
    Event.key == "Enter"
  ) {
    finalValues(custom.value);
    zero();
  }
});

price.addEventListener("change", () => {
  finalValues(custom.value);
  zero();
});

reset.addEventListener("click", function () {
  zero();
  defaultValue();
  price.value = "0";
  people.value = "1";
});

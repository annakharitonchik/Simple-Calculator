import { Numbers } from "./Numbers.js";
import { Symbols } from "./Symbols.js";
import { Display } from "./Display.js";
import { colorTheme, Theme } from "./Theme.js";
import "../styles/Calculator.css";
import "../styles/Display.css";
import "../styles/Numbers.css";
import "../styles/Symbols.css";
import "../styles/Theme.css";
export const Calculator = () => {
  const calculatorDiv = document.createElement("div");
  const numsAndSymbs = document.createElement("div");
  const buttons = document.createElement("div");
  calculatorDiv.classList = "Calculator";
  numsAndSymbs.classList = "NumsAndSymbs";
  buttons.classList = "Buttons";
  const state = {
    currentNum: "0",
    firstArg: "",
    secondArg: "",
    currentOperator: "",
    lastButton: "",
  };

  const updateDisplay = (displayText, state, result = null) => {
    if (result !== null) {
      displayText.textContent = result.toString();
    } else if (state.currentNum) {
      displayText.textContent = state.currentNum;
    } else if (state.secondArg) {
      displayText.textContent = state.secondArg;
    } else if (state.firstArg) {
      displayText.textContent = state.firstArg;
    } else {
      displayText.textContent = state.currentNum || "0";
    }
    if (displayText.textContent.length > 9) {
      displayText.textContent = parseFloat(displayText.textContent)
        .toExponential([3])
        .replace(".", ",");
    } else {
      displayText.textContent = displayText.textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace(".", ",");
    }

    console.log(
      "first:" + state.firstArg + "\n",
      "operator:" + state.currentOperator + "\n",
      "second:" + state.secondArg + "\n",
      "current:" + state.currentNum + "\n",
      "result:" + result
    );
  };

  const { displayField, displayText } = Display();

  const { symbolsField, symbolsColumn } = Symbols(
    displayText,
    state,
    updateDisplay
  );
  symbolsField.classList = "Symbols";

  const numbersField = Numbers(displayText, state, updateDisplay);
  numbersField.classList = "Numbers";

  numsAndSymbs.appendChild(symbolsField);
  numsAndSymbs.appendChild(numbersField);
  calculatorDiv.appendChild(Theme(symbolsColumn));
  calculatorDiv.appendChild(displayField);
  buttons.appendChild(numsAndSymbs);
  buttons.appendChild(symbolsColumn);
  calculatorDiv.appendChild(buttons);

  const numbers = Array.from(numbersField.querySelectorAll("button"));
  const operatorsRow = Array.from(symbolsField.querySelectorAll("button"));
  const operatorsColumn = Array.from(symbolsColumn.querySelectorAll("button"));
  const keyboardInput = (eo) => {
    const key = eo.key;
    if ((key >= "0" && key <= "9") || key === "," || key === ".") {
      const button = numbers.find(
        (butt) => butt.textContent === (key === "." ? "," : key)
      );
      button && button.click() && eo.preventDefault();
    } else if (key === "+") {
      const button = operatorsColumn.find(
        (butt) => butt.textContent === "\u002B"
      );
      button && button.click() && eo.preventDefault();
    } else if (key === "-") {
      const button = operatorsColumn.find(
        (butt) => butt.textContent === "\u2212"
      );
      button && button.click() && eo.preventDefault();
    } else if (key === "/") {
      const button = operatorsColumn.find(
        (butt) => butt.textContent === "\u00F7"
      );
      button && button.click() && eo.preventDefault();
    } else if (key === "*") {
      const button = operatorsColumn.find(
        (butt) => butt.textContent === "\u00D7"
      );
      button && button.click() && eo.preventDefault();
    } else if (key === "=" || key === "Enter") {
      const button = operatorsColumn.find(
        (butt) => butt.textContent === "\u003D"
      );
      button && button.click() && eo.preventDefault();
    } else if (key === "%") {
      const button = operatorsRow.find((butt) => butt.textContent === "\u0025");
      button && button.click() && eo.preventDefault();
    } else if (key === "Delete") {
      const button = operatorsRow.find((butt) => butt.textContent === "AC");
      button && button.click() && eo.preventDefault();
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const allButtons = symbolsColumn.querySelectorAll("button");
    allButtons.forEach((btn) => (btn.dataset.themeColor = "#febc2e"));
    allButtons.forEach((button) => {
        button.addEventListener("click", () => {
          allButtons.forEach((btn) => {
            btn.style.color = " #ebebeb";
            btn.style.backgroundColor = colorTheme;
            btn.dataset.toggled = "false";
          });
  
          button.style.color = colorTheme;
          button.style.backgroundColor = " #ebebeb";
          button.dataset.toggled = "true";
        });
      });

const activeButtons = numsAndSymbs.querySelectorAll("button");
activeButtons.forEach((button) => {
  button.addEventListener("click", () => {
  // сбрасываем всем
  activeButtons.forEach((btn) => btn.classList.remove("active"));
  // делаем активной только нажатую
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 400);
});
  })})
 
  document.addEventListener("keydown", keyboardInput);
  return calculatorDiv;
};

import { Numbers } from "./Numbers.js";
import { Symbols } from "./Symbols.js";
import { Display } from "./Display.js";
export const Calculator = () => {
  const calculatorDiv = document.createElement("div");

  const state = {
    currentNum: "0",
    firstArg: "",
    secondArg: "",
    currentOperator: "",
    lastButton: "",
  };
  const updateDisplay = (displayText, state, result = null) => {
    if (result !== null) {
      displayText.textContent =
        typeof result === "number"
          ? parseFloat(result.toPrecision(9)).toString().replace(".", ",")
          : result;
    } else if (state.currentNum) {
      displayText.textContent = state.currentNum;
    } else if (state.secondArg) {
      displayText.textContent = state.secondArg;
    } else if (state.firstArg) {
      displayText.textContent = state.firstArg;
    } else {
      displayText.textContent = state.currentNum || "0";
    }
    displayText.textContent = displayText.textContent.replace(".", ",");

    console.log(
      "first:" + state.firstArg + "\n",
      "operator:" + state.currentOperator + "\n",
      "second:" + state.secondArg + "\n",
      "current:" + state.currentNum
    );
  };
  const { displayField, displayText } = Display();
  calculatorDiv.appendChild(displayField);

  const numbersField = Numbers(displayText, state, updateDisplay);
  numbersField.id = "numbers";
  calculatorDiv.appendChild(numbersField);

  const symbolsField = Symbols(displayText, state, updateDisplay);
  symbolsField.id = "symbols";
  calculatorDiv.appendChild(symbolsField);

  const numbers = Array.from(numbersField.querySelectorAll("button"));
  const operators = Array.from(symbolsField.querySelectorAll("button"));

  const keyboardInput = (eo) => {
    const key = eo.key;
    if ((key >= "0" && key <= "9") || key === "," || key === ".") {
      const button = numbers.find(
        (butt) => butt.textContent === (key === "." ? "," : key)
      );
      button && button.click();
    } else if (["+", "-", "/", "*"].includes(key)) {
      const button = operators.find((butt) => butt.textContent === key);
      button && button.click();
    } else if (key === "=" || key === "Enter") {
      const button = operators.find((butt) => butt.textContent === "=");
      button && button.click();
    } else if (key === "%") {
      const button = operators.find((butt) => butt.textContent === "%");
      button && button.click();
    } else if (key === "Delete") {
      const button = operators.find((butt) => butt.textContent === "AC");
      button && button.click();
    }
  };

  document.addEventListener("keydown", keyboardInput);
  return calculatorDiv;
};

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
    lastButton: ""
  };

  const updateDisplay = (displayText, state, result = null) => {
    if (result !== null) {
      displayText.textContent = result;
    } else if (state.currentNum) {
      displayText.textContent = state.currentNum;
    } else if (state.secondArg) {
      displayText.textContent = state.secondArg;
    } else if (state.firstArg) {
      displayText.textContent = state.firstArg;
    } else {
      displayText.textContent = state.currentNum || "0";
    }
    
    console.log(
      "first:" + state.firstArg + "\n",
      "operator:" + state.currentOperator + "\n",
      "second:" + state.secondArg + "\n",
      "current:" + state.currentNum
    );
  };

  const { displayField, displayText } = Display();
  calculatorDiv.appendChild(displayField);
  calculatorDiv.appendChild(Numbers(displayText, state, updateDisplay));
  calculatorDiv.appendChild(Symbols(displayText, state, updateDisplay));
  return calculatorDiv;
};

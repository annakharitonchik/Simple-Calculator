import { Numbers } from "./Numbers.js";
import { Symbols } from "./Symbols.js";
import { Display } from "./Display.js";
export const Calculator = () => {
  const calculatorDiv = document.createElement("div");

  const state = {
    currentNum: "",
  };

  const updateDisplay = (displayText, state) => {
    
      displayText.textContent = state.currentNum || "0";
    
  };

  const { displayField, displayText } = Display();
  calculatorDiv.appendChild(displayField);
  calculatorDiv.appendChild(Numbers(displayText, state, updateDisplay));
  calculatorDiv.appendChild(Symbols());
  return calculatorDiv;
};

import { Numbers } from "./Numbers.js";
import { Symbols } from "./Symbols.js";
import { Display } from "./Display.js";
export const Calculator = () => {
  const calculatorDiv = document.createElement("div");

  const state = {
    currentNum: "",
  };

  const { displayField, displayText } = Display();
  calculatorDiv.appendChild(displayField);
  calculatorDiv.appendChild(Numbers(displayText, state));
  calculatorDiv.appendChild(Symbols());
  return calculatorDiv;
};

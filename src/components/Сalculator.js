import { Numbers } from "./Numbers.js";
import { Symbols } from "./Symbols.js";

export const Calculator = () => {
  const calculatorDiv = document.createElement("div");

  const state = {
    currentNum: "",
  };

  calculatorDiv.appendChild(Numbers(state));
  calculatorDiv.appendChild(Symbols());
  return calculatorDiv;
};
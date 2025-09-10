import { Numbers } from "./Numbers.js";

export const Calculator = () => {
  const calculatorDiv = document.createElement("div");

  const state = {
    currentNum: "",
  };

  calculatorDiv.appendChild(Numbers(state));
 
  return calculatorDiv;
};
export const Symbols = (displayText, state) => {
  const symbolsField = document.createElement("div");
  const symbols = ["AC", "+/-", "%", "/", "*", "-", "+", "="];

  symbols.forEach((symb) => {
    const symbButton = document.createElement("button");
    symbButton.textContent = symb;
    symbolsField.appendChild(symbButton);
    symbButton.addEventListener("click", () => {
      let result = null;
      if (symb === "AC") {
        state.currentNum = "";
        state.firstArg = "";
        state.secondArg = "";
        state.currentOperator = "";
        result = 0;
      } else if (["+", "-", "/", "*"].includes(symb)) {
        state.firstArg = state.currentNum;
        state.currentOperator = symb;
        state.currentNum = "";
      } else if (symb === "=") {
        if (state.firstArg && state.currentNum && state.currentOperator) {
          state.secondArg = state.currentNum;
          const a = parseFloat(state.firstArg);
          const b = parseFloat(state.secondArg);
          switch (state.currentOperator) {
            case "+":
              result = a + b;
              break;
            case "-":
              result = a - b;
              break;
            case "/":
              result = b !== 0 ? a / b : "Error";
              break;
            case "*":
              result = a * b;
              break;
          }
          state.currentNum = result.toString();
          state.firstArg = state.currentNum;
          state.secondArg = "";
          state.currentOperator = "";
        }
      }
     
      console.log(
        state.firstArg,
        state.secondArg,
        state.currentOperator,
        result
      );
    });
  });

  return symbolsField;
};

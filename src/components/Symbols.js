export const Symbols = (displayText, state, updateDisplay) => {
  const symbolsField = document.createElement("div");
  const symbols = ["AC", "+/-", "%", "/", "*", "-", "+", "="];
  symbols.forEach((symb) => {
    const symbButton = document.createElement("button");
    symbButton.textContent = symb;
    symbolsField.appendChild(symbButton);
    symbButton.addEventListener("click", () => {
      let result = null;
      const prevButton = state.lastButton;
      state.lastButton = symb;
      if( state.firstArg === "Error"){
        state.currentNum = "Error";
        state.firstArg = "";
        state.secondArg = "";
        state.currentOperator = "";
        state.lastButton = "";
      }
      const doOperation = () => {
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
      };
      if (symb === "AC") {
        state.currentNum = "0";
        state.firstArg = "";
        state.secondArg = "";
        state.currentOperator = "";
        state.lastButton = "";
        result = 0;
      } else if (["+", "-", "/", "*"].includes(symb)) {
        if (prevButton === "=") {
          state.firstArg = state.currentNum;
          state.currentNum = "";
          state.secondArg = state.currentNum;
        }
        if (state.firstArg && state.currentNum && state.currentOperator) {
          state.secondArg = state.currentNum;
          doOperation();
          state.currentNum = result.toString();
          state.firstArg = state.currentNum;
          state.secondArg = "";
        } else if (state.currentNum) {
          state.firstArg = state.currentNum;
        }
        state.currentOperator = symb;
        state.currentNum = "";
      } else if (symb === "=") {
        if (state.currentNum && !state.secondArg) {
          state.secondArg = state.currentNum;
        }
        if (state.firstArg && !state.secondArg) {
          state.secondArg = state.firstArg;
        }
        if (state.firstArg && state.currentOperator && state.secondArg) {
          doOperation();

          state.currentNum = result.toString();
          state.firstArg = state.currentNum;
        }
      }

      updateDisplay(displayText, state, result);
    });
  });

  return symbolsField;
};

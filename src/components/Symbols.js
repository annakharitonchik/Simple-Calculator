export const Symbols = (displayText, state, updateDisplay) => {
  const symbolsField = document.createElement("div");
  const symbolsColumn = document.createElement("div");
  symbolsColumn.classList = "SymbolsColumn";
  const symbols = [
    "AC",
    "\u002B/\u2212",
    "\u0025",
    "\u00F7",
    "\u00D7",
    "\u2212",
    "\u002B",
    "\u003D",
  ];
  const formatNumber = (num) => {
    if (typeof num === "number") num = num.toString();
    return num.replace(".", ",");
  };
  
  symbols.forEach((symb, i) => {
    const symbButton = document.createElement("button");
    symbButton.textContent = symb;
    symbButton.id = `SymbButt${i}`;
    if (
      symb === "\u00F7" ||
      symb === "\u00D7" ||
      symb === "\u2212" ||
      symb === "\u002B" ||
      symb === "\u003D"
    ) {
      symbolsColumn.appendChild(symbButton);
    } else {
      symbolsField.appendChild(symbButton);
    }
    symbButton.addEventListener("click", () => {
      let result = null;
      const prevButton = state.lastButton;
      state.lastButton = symb;
      if (state.firstArg === "Error") {
        state.currentNum = "Error";
        state.firstArg = "";
        state.secondArg = "";
        state.currentOperator = "";
        state.lastButton = "";
      }
      const doOperation = () => {
        const a = parseFloat(state.firstArg.replace(",", "."));
        const b = parseFloat(state.secondArg.replace(",", "."));
        switch (state.currentOperator) {
          case "\u002B":
            result = a + b;
            break;
          case "\u2212":
            result = a - b;
            break;
          case "\u00F7":
            result = b !== 0 ? a / b : "Error";
            break;
          case "\u00D7":
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
      } else if (["\u002B", "\u2212", "\u00F7", "\u00D7"].includes(symb)) {
        if (prevButton === "\u003D") {
          state.firstArg = state.currentNum;
          state.currentNum = "";
          state.secondArg = state.currentNum;
        }
        if (state.firstArg && state.currentNum && state.currentOperator) {
          state.secondArg = state.currentNum;
          doOperation();
          state.currentNum = formatNumber(result);
          state.firstArg = state.currentNum;
          state.secondArg = "";
        } else if (state.currentNum) {
          state.firstArg = state.currentNum;
        }
        state.currentOperator = symb;
        state.currentNum = "";
      } else if (symb === "\u003D") {
        if (state.currentNum && !state.secondArg) {
          state.secondArg = state.currentNum;
        }
        if (state.firstArg && !state.secondArg) {
          state.secondArg = state.firstArg;
        }
        if (state.firstArg && state.currentOperator && state.secondArg) {
          doOperation();

          state.currentNum = formatNumber(result);
          state.firstArg = state.currentNum;
        }
      } else if (symb === "\u002B/\u2212") {
        if (!state.currentNum || state.currentNum === "Error") {
          state.currentNum = "Error";
        } else {
          if (state.currentNum.startsWith("-")) {
            state.currentNum = state.currentNum.slice(1);
          } else {
            state.currentNum = "-" + state.currentNum.toString();
          }
          
        }
      } else if (symb === "\u0025") {
        if (!state.currentNum || state.currentNum === "Error") {
          state.currentNum = "Error";
        } else {
          let num = parseFloat(state.currentNum.replace(",", ".")) / 100;
          state.currentNum = formatNumber(num);
        }
      }
      updateDisplay(displayText, state, result);
    });
  });

  return { symbolsField, symbolsColumn };
};

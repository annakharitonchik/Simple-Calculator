import "../styles/Numbers.css"
export const Numbers = (displayText, state, updateDisplay) => {
  const numField = document.createElement("div");
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ","];

  numbers.forEach((num, i) => {
    const numButton = document.createElement("button");
    numButton.textContent = num;
    numButton.id = `NumButt${i}`;
    numField.appendChild(numButton);
    numButton.addEventListener("click", () => {
      if (num === ",") {
        if (
          !state.currentNum.includes(",") &&
          state.currentNum !== "Error" &&
          state.currentNum.length < 9
        )
          state.currentNum += ",";
      } else {
        if (state.currentNum === "0" || state.currentNum === "Error") {
          state.currentNum = num.toString();
        } else {
          if (state.currentNum.replace(".", ",").length < 9) {
            state.currentNum += num.toString();
          }
        }
        const prevButton = state.lastButton;
        if ((prevButton === "=" && state.firstArg) || prevButton === "%") {
          state.currentNum = num.toString();
          state.secondArg = "";
          state.firstArg = "";
        }
      }
      updateDisplay(displayText, state);
    });
  });
  return numField;
};

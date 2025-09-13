export const Theme = (symbolsColumn) => {
  const ThemeDiv = document.createElement("div");
  ThemeDiv.classList = "ThemeDiv";
  const colors = ["#ff5f57", "#febc2e", "#28c840"];
  const changeColor = (arrOfButtons, backgroundColors) => {
    const buttons = arrOfButtons.querySelectorAll("button");
    console.log(buttons);
    buttons.forEach((button) => {
      button.style.backgroundColor = backgroundColors;
    });
  };
  colors.map((color) => {
    const ThemeColor = document.createElement("button");
    ThemeColor.classList = "ThemeColor";
    ThemeColor.style.background = color;
    ThemeDiv.appendChild(ThemeColor);

    ThemeColor.addEventListener("click", () => {
      changeColor(symbolsColumn, color);
    });
  });
  return ThemeDiv;
};

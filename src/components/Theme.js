export let colorTheme = "#febc2e";

export const Theme = (symbolsColumn) => {
  const ThemeDiv = document.createElement("div");
  ThemeDiv.classList = "ThemeDiv";
  const colors = ["#ff5f57", "#febc2e", "#28c840"];
  const changeColor = (arrOfButtons, backgroundColor) => {
    colorTheme = backgroundColor;
    const buttons = arrOfButtons.querySelectorAll("button");
    buttons.forEach((button) => {
      if (button.dataset.toggled === "true") {
        button.style.color = colorTheme;
      
      }else if (button.dataset.toggled === "false"){
      button.style.backgroundColor = colorTheme;
      button.style.color = " #ebebeb";}
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

export const Symbols = () => {
    const symbolsField = document.createElement("div");
    const symbols = ["AC", "+/-", "%", "/", "*", "-", "+", "="];
  
    symbols.forEach((symb) => {
      const symbButton = document.createElement("button");
      symbButton.textContent = symb;
      symbolsField.appendChild(symbButton);
  
      
    });
  
    return symbolsField;
  };
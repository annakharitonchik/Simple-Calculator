export const Display = () => {
    const displayField = document.createElement("div");
    const displayText = document.createElement("p");
    displayText.textContent = 0;
    displayField.appendChild(displayText);
    return {displayField,  displayText}
  };
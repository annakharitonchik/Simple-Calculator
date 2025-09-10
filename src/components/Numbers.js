export const Numbers = () => {
  const numField = document.createElement("div");
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  numbers.forEach((num) => {
    const numButton = document.createElement("button");
    numButton.textContent = num;
    numField.appendChild(numButton);
  });
  return numField;
};

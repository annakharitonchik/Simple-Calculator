import { beforeEach, describe, it } from "mocha";
import { expect } from "chai";
import { Numbers } from "../src/components/Numbers.js";
import { Symbols } from "../src/components/Symbols.js";
import { JSDOM } from "jsdom";

const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
globalThis.document = dom.window.document;
globalThis.window = dom.window;

let state;
let displayText;
let updateDisplay;

beforeEach(() => {
  state = {
    currentNum: "0",
    firstArg: "",
    secondArg: "",
    currentOperator: "",
    lastButton: "",
  };
  displayText = document.createElement("div");
  updateDisplay = () => {};
});

const clickOnButton = (element, text) => {
  const btn = Array.from(element.querySelectorAll("button")).find(
    (b) => b.textContent === text
  );
  if (!btn) throw new Error(`Button "${text}" not found`);
  btn.click();
};

describe("Calculator operations", () => {
  it("Addition: 2 + 3 = 5", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay).symbolsColumn;

    clickOnButton(numbers, "2");
    clickOnButton(symbols, "\u002B");
    clickOnButton(numbers, "3");
    clickOnButton(symbols, "=");

    expect(state.currentNum).to.equal("5");
  });
  it("Difference: 5 - 3 = 2", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay).symbolsColumn;

    clickOnButton(numbers, "5");
    clickOnButton(symbols, "\u2212");
    clickOnButton(numbers, "3");
    clickOnButton(symbols, "=");

    expect(state.currentNum).to.equal("2");
  });
  it("Multiplication: 5 * 2 = 10", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay).symbolsColumn;

    clickOnButton(numbers, "5");
    clickOnButton(symbols, "\u00D7");
    clickOnButton(numbers, "2");
    clickOnButton(symbols, "=");

    expect(state.currentNum).to.equal("10");
  });
  it("Division: 10 / 2 = 5", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay).symbolsColumn;

    clickOnButton(numbers, "1");
    clickOnButton(numbers, "0");
    clickOnButton(symbols, "\u00F7");
    clickOnButton(numbers, "2");
    clickOnButton(symbols, "=");

    expect(state.currentNum).to.equal("5");
  });
  it("Division by 0 produces Error: 10 / 0 = Error", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay).symbolsColumn;

    clickOnButton(numbers, "1");
    clickOnButton(numbers, "0");
    clickOnButton(symbols, "\u00F7");
    clickOnButton(numbers, "0");
    clickOnButton(symbols, "=");

    expect(state.currentNum).to.equal("Error");
  });
  it("Complex addition: 5 + 5 + 2 + 3  = 15", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay).symbolsColumn;

    clickOnButton(numbers, "5");
    clickOnButton(symbols, "\u002B");
    clickOnButton(numbers, "5");
    clickOnButton(symbols, "\u002B");
    clickOnButton(numbers, "2");
    clickOnButton(symbols, "\u002B");
    clickOnButton(numbers, "3");
    clickOnButton(symbols, "=");

    expect(state.currentNum).to.equal("15");
  });
  it("Click on equal a few times: 10 + 1 = 15", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay).symbolsColumn;

    clickOnButton(numbers, "1");
    clickOnButton(numbers, "0");
    clickOnButton(symbols, "\u002B");
    clickOnButton(numbers, "1");
    clickOnButton(symbols, "=");
    clickOnButton(symbols, "=");
    clickOnButton(symbols, "=");
    clickOnButton(symbols, "=");
    clickOnButton(symbols, "=");

    expect(state.currentNum).to.equal("15");
  });
  it("Plus/minus: 5 = -5", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay).symbolsField;

    clickOnButton(numbers, "5");
    clickOnButton(symbols, "\u002B/\u2212");

    expect(state.currentNum).to.equal("-5");
  });
  it("No point", () => {
    const numbers = Numbers(displayText, state, updateDisplay);

    clickOnButton(numbers, "5");
    clickOnButton(numbers, ",");
    clickOnButton(numbers, "3");
    clickOnButton(numbers, "1");
    clickOnButton(numbers, ",");
    clickOnButton(numbers, "3");
    expect(state.currentNum).to.equal("5,313");
    expect(state.currentNum).to.not.include(".");
  });
  it("Percent: 5% = 0,05", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay);

    clickOnButton(numbers, "5");
    clickOnButton(symbols.symbolsField, "\u0025");
    clickOnButton(symbols.symbolsColumn, "=");
    expect(state.currentNum).to.equal("0,05");
  });
  it("Addition with comma: 1,5 + 2,5 = 4", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay).symbolsColumn;

    clickOnButton(numbers, "1");
    clickOnButton(numbers, ",");
    clickOnButton(numbers, "5");
    clickOnButton(symbols, "\u002B");
    clickOnButton(numbers, "2");
    clickOnButton(numbers, ",");
    clickOnButton(numbers, "5");
    clickOnButton(symbols, "=");

    expect(state.currentNum).to.equal("4");
  });
  it("Toggle sign on zero", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay);

    clickOnButton(numbers, "0");
    clickOnButton(symbols.symbolsField, "\u002B/\u2212");
    expect(state.currentNum).to.equal("-0");

    clickOnButton(symbols.symbolsField, "\u002B/\u2212");
    expect(state.currentNum).to.equal("0");
  });
  it("Complex sequence with comma: 1,5 + 2,5 - 1,0 = 3", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay).symbolsColumn;

    clickOnButton(numbers, "1");
    clickOnButton(numbers, ",");
    clickOnButton(numbers, "5");
    clickOnButton(symbols, "\u002B");
    clickOnButton(numbers, "2");
    clickOnButton(numbers, ",");
    clickOnButton(numbers, "5");
    clickOnButton(symbols, "\u2212");
    clickOnButton(numbers, "1");
    clickOnButton(numbers, ",");
    clickOnButton(numbers, "0");
    clickOnButton(symbols, "=");

    expect(state.currentNum).to.equal("3");
  });
  it("Mixed operations: 50,5% + 1 = 1,505", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay);

    clickOnButton(numbers, "5");
    clickOnButton(numbers, "0");
    clickOnButton(numbers, ",");
    clickOnButton(numbers, "5");
    clickOnButton(symbols.symbolsField, "\u0025");
    clickOnButton(symbols.symbolsColumn, "\u002B");
    clickOnButton(numbers, "1");
    clickOnButton(symbols.symbolsColumn, "=");

    expect(state.currentNum).to.equal("1,505");
  });
  it("Mixed operations: 600 * 20% = 120", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay);

    clickOnButton(numbers, "6");
    clickOnButton(numbers, "0");
    clickOnButton(numbers, "0");
    clickOnButton(symbols.symbolsColumn, "\u00D7");
    clickOnButton(numbers, "2");
    clickOnButton(numbers, "0");
    clickOnButton(symbols.symbolsField, "\u0025");
    clickOnButton(symbols.symbolsColumn, "=");

    expect(state.currentNum).to.equal("120");
  });
  it("-0 behaves like 0 in calculations: -0 + 5 = 5", () => {
    const numbers = Numbers(displayText, state, updateDisplay);
    const symbols = Symbols(displayText, state, updateDisplay);

    state.currentNum = "0";
    clickOnButton(symbols.symbolsField, "\u002B/\u2212");
    clickOnButton(symbols.symbolsColumn, "\u002B");
    clickOnButton(numbers, "5");
    clickOnButton(symbols.symbolsColumn, "=");

    expect(state.currentNum).to.equal("5");
  });
});

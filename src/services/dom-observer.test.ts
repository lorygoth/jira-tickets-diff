import * as mutator from "./dom-modifier.ts";
import { observeChanges } from "./dom-observer.ts";

jest.mock("./dom-modifier.ts");

describe('observeChanges', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-testid="issue-history.ui.history-items.generic-history-item.history-item">...</div>
      <div data-testid="issue-history.ui.feed-container">...</div>
      <div data-testid="dummy">...</div>
    `;
  })

  test('Should call tryBeautifyChanges for the targeted elements', () => {
    const spy = jest.spyOn(mutator, "tryBeautifyChanges");
    observeChanges();
  
    // Simulate the DOM change
    const newNode = document.createElement('div');
    newNode.setAttribute("data-testid", "issue-history.ui.history-items.generic-history-item.history-item");
    document.body.appendChild(newNode);
  
    // You have to delay the assertion a bit because MutationObserver is async
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(newNode);
    }, 0);
  });

  test('Should not call tryBeautifyChanges for the filtered elements', () => {
    const spy = jest.spyOn(mutator, "tryBeautifyChanges");
    observeChanges();
  
    // Simulate the DOM change
    const ignoredNode = document.createElement('div');
    ignoredNode.setAttribute("data-testid", "dummy");
    document.body.appendChild(ignoredNode);
  
    // You have to delay the assertion a bit because MutationObserver is async
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).not.toHaveBeenCalledWith(ignoredNode);
    }, 0);
  });
});

import { isDefined } from '../utils.ts';
import { tryBeautifyChanges } from './dom-modifier.ts';

const targetNode = document.querySelector('body');
const config: MutationObserverInit = { attributes: false, childList: true, subtree: true };
const historyEntries = [
  'issue-history.ui.history-items.generic-history-item.history-item',
  'issue-history.ui.feed-container',
];

const isElement = (node: Node): node is Element => node instanceof Element;

const isHistoryEntryElement = (node: Element): boolean => {
  const attributeValue = node.getAttribute('data-testid');
  return !!attributeValue && historyEntries.includes(attributeValue);
};

const observer = new MutationObserver(function (mutationsList, _) {
  for (let mutation of mutationsList) {
    [mutation.target, ...mutation.addedNodes]
      .filter(isElement)
      .filter(isHistoryEntryElement)
      .map((element) => element.children[1]?.children[1])
      .filter(isDefined)
      .forEach(tryBeautifyChanges);
  }
});

export const observeChanges = () => {
  if (!targetNode) {
    return;
  }

  observer.observe(targetNode, config);
};

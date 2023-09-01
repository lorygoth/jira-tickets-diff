import { diffWords } from 'diff';

const wrapWithTag = (content: Element | string, tagName: string, attributes?: Record<string, string>) => {
  const element = document.createElement(tagName);

  if (attributes) {
    Object.entries(attributes).forEach(([attributeName, value]) => element.setAttribute(attributeName, value));
  }

  if (typeof content === 'string') {
    element.textContent = content;
  } else {
    element.appendChild(content);
  }

  return element;
};

type Handler = (content: Element | string) => Element;

const markAsRemoved: Handler = (content) => wrapWithTag(content, 'del');
const markAsNew: Handler = (content) => wrapWithTag(content, 'b');
const markAsSame: Handler = (content) => wrapWithTag(content, 'span', { style: 'opacity: 0.5;' });

export const getDiffContent = (original: string, modified: string): string => {
  const placeholderElement = document.createElement('div');
  const markedText = diffWords(original, modified).map(({ added, removed, value }) => {
    const handler: Handler = added ? markAsNew : removed ? markAsRemoved : markAsSame;
    return handler(value);
  });
  placeholderElement.append(...markedText);

  return placeholderElement.outerHTML;
};

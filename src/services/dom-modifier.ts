import { getDiffContent } from './changes-marker.ts';

const processedFlagAttributeName = 'data-fixed';

interface Changes {
  oldContent: string;
  newContent: string;
}

const getChangesByBaseElement = (element: Element): Changes | undefined => {
  if (element.attributes.getNamedItem(processedFlagAttributeName)) {
    return;
  }

  const [elementWithOldValue, _, elementWithNewValue] = [...(element.children || [])];

  if (!elementWithOldValue || !elementWithNewValue) {
    return;
  }

  const oldContent = elementWithOldValue.children[0]?.textContent;
  const newContent = elementWithNewValue.children[0]?.textContent;

  return oldContent || newContent ? { oldContent: oldContent ?? '', newContent: newContent ?? '' } : undefined;
};

export const tryBeautifyChanges = (element: Element) => {
  const changesInfo = getChangesByBaseElement(element);
  if (!changesInfo) {
    return;
  }

  // clear history entry content
  element.replaceChildren();

  const diffContent = getDiffContent(changesInfo.oldContent, changesInfo.newContent);
  element.innerHTML = diffContent;
  element.setAttribute(processedFlagAttributeName, 'true');
};

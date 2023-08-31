import { tryBeautifyChanges } from './dom-modifier.ts';
import * as changedMarker from './changes-marker.ts';

jest.mock('./changes-marker.ts');

const createHtmlBodyWithHTML = (html: string) => {
  const parser = new DOMParser();
  const cleanedUpHtml = html.replace(/\n/g, '');
  const doc = parser.parseFromString(`<html><body>${cleanedUpHtml}</body></html>`, 'text/html');
  return doc.body;
};

describe('tryBeautifyChanges', () => {
  describe('unsuitable html elements', () => {
    const testCases: {
      description: string;
      element: Element;
    }[] = [
      {
        description: 'when element was already processed, should do nothing',
        element: createHtmlBodyWithHTML(`
                <div data-fixed="true">
                    <div>
                        <div>old value content</div>
                    </div>
                    <div></div>
                    <div>
                        <div>new value content</div>
                    </div>
                </div>`).children[0] as Element,
      },
      {
        description: 'when element has no proper children, should do nothing',
        element: createHtmlBodyWithHTML(`
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>`).children[0] as Element,
      },
      {
        description: 'when element none of the diff elements has content, should do nothing',
        element: createHtmlBodyWithHTML(`
                <div>
                    <div><span></span></div>
                    <div></div>
                    <div><span></span></div>
                </div>`).children[0] as Element,
      },
    ];

    testCases.forEach(({ description, element }) => {
      test(description, () => {
        const getDiffContentMock = jest.spyOn(changedMarker, 'getDiffContent');
        const result = tryBeautifyChanges(element);
        expect(result).toBeUndefined();
        expect(getDiffContentMock).toBeCalledTimes(0);
      });
    });
  });
  test('when called with suitable html element, should return properly', () => {
    const element = createHtmlBodyWithHTML(`
            <div>
                <div>
                    <div>old value content</div>
                </div>
                <div></div>
                <div>
                    <div>new value content</div>
                </div>
            </div>`).children[0] as Element;

    const getDiffContentMock = jest.spyOn(changedMarker, 'getDiffContent');

    const result = tryBeautifyChanges(element);

    expect(result).toBeUndefined();
    expect(getDiffContentMock).toBeCalledWith('old value content', 'new value content');
  });
});

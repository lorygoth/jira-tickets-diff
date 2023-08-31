import Diff from 'diff';
import { getDiffContent } from './changes-marker';

describe('markChanges', () => {
  describe('getDiffContent', () => {
    test('when there are new changes, should mark them correctly', () => {
      const oldString = 'The quick brown fox jumps over the lazy dog';
      const newString = 'The quick brown fox jumps high over the lazy dog (wow!)';
      const result = getDiffContent(oldString, newString);
      expect(result).toEqual(
        `<div><span style="opacity: 0.5;">The quick brown fox jumps </span><b>high </b><span style="opacity: 0.5;">over the lazy dog</span><b> (wow!)</b></div>`
      );
    });
  });
});

/**
 * Insert text at the cursor position in a textarea.
 */
export function insertTextAtCursor(element: HTMLTextAreaElement, textToInsert: string) {
  element.focus();

  // Use the browser's built-in undoable actions if possible
  if (window.getSelection() && document.queryCommandSupported('insertText')) {
    document.execCommand('insertText', false, textToInsert);
  } else {
    console.warn('insertTextAtCursor: document.execCommand is not supported');
    const startPos = element.selectionStart;
    const endPos = element.selectionEnd;
    const beforeText = element.value.substring(0, startPos);
    const afterText = element.value.substring(endPos);
    element.value = beforeText + textToInsert + afterText;
    element.selectionStart = element.selectionEnd = startPos + textToInsert.length;
    const event = new Event('input', { bubbles: true });
    element.dispatchEvent(event);
  }
}

/**
 * Necessary resize helper for edge cases where paste doesn't update the container height.
 *
 1) Resetting the height to 'auto' forces the component to recalculate height based on its current content

 2) Forcing a reflow. Accessing offsetHeight will cause a reflow of the page,
    ensuring that the reset height takes effect before resetting back to the scrollHeight.
    This step is necessary because changes to the DOM do not instantly cause reflows.

 3) Reseting back to scrollHeight reads and applies the ideal height for the current content dynamically
 */
export const forceResize = (textAreaRef: React.RefObject<HTMLTextAreaElement>) => {
  if (textAreaRef.current) {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.offsetHeight;
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }
};

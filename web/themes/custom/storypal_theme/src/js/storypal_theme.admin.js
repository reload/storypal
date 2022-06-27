document.addEventListener("DOMContentLoaded", () => {
  // We need to wait for CKEditor to be initilized, but we dont have any
  // fancy callbacks that we can use.
  setTimeout(initCkeditor, 1000);
});

function initCkeditor() {
  const ckes = document.querySelectorAll(".form-textarea-wrapper .cke");

  if (!ckes.length) {
    return;
  }

  ckes.forEach((cke) => {
    const textarea = cke.parentNode.querySelector(
      "[data-editor-active-text-format]"
    );

    if (!textarea) {
      return;
    }

    const textFormat = textarea.getAttribute("data-editor-active-text-format");

    if (!textFormat) {
      return;
    }

    const wysiwygFrame = cke.querySelector("iframe.cke_wysiwyg_frame");

    if (!wysiwygFrame || !wysiwygFrame.contentDocument.body) {
      return;
    }

    wysiwygFrame.contentDocument.body.setAttribute("text-format", textFormat);
  });
}

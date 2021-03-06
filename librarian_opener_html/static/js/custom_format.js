// Generated by CoffeeScript 1.10.0
(function(window, $, templates) {
  var ESC, closeModal, frame, keepFormatting, patchStyle;
  ESC = 27;
  templates._load('cssPatch');
  frame = $('#opener-html-main');
  keepFormatting = frame.data('keep-formatting');
  console.log(keepFormatting);
  closeModal = function(e) {
    if (e.which === ESC) {
      return frame.closeModal();
    }
  };
  patchStyle = function() {
    var embeddedPage, head;
    embeddedPage = frame.contents();
    head = embeddedPage.find('head');
    if (!head.length) {
      head = $('<head>');
      embeddedPage.prepend(head);
    }
    head.append(templates.cssPatch);
  };
  return frame.on('load', function() {
    if (frame.contents().prop('readyState') === 'complete') {
      setTimeout(function() {
        var contentWin, frameContent;
        contentWin = frame[0].contentWindow;
        contentWin.focus();
        frameContent = $(contentWin.window);
        return frameContent.on('keydown', closeModal);
      }, 500);
      if (keepFormatting) {
        return;
      }
      return patchStyle();
    }
  });
})(this, this.jQuery, this.templates);

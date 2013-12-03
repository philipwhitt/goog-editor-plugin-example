goog.provide('app.TextEditor');

goog.require('app.editor.RichTextEditor');
goog.require('goog.debug.ErrorHandler');

/**
 * @param {string=} opt_elId
 */
app.TextEditor = function(opt_elId) {
	var editor = new app.editor.RichTextEditor();
	editor.render(opt_elId ? goog.dom.getElement(opt_elId) : undefined);
};

goog.exportSymbol('app', app);
app = goog.getObjectByName('app');

goog.exportProperty(app, 'TextEditor', app.TextEditor);

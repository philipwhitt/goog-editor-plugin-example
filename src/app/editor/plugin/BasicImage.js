goog.provide('app.editor.plugin.BasicImage');

goog.require('goog.editor.Plugin');

/**
 * @constructor
 * @extends {goog.editor.Plugin}
 */
app.editor.plugin.BasicImage = function() {
	goog.base(this);
};
goog.inherits(app.editor.plugin.BasicImage, goog.editor.Plugin);

/** @inheritDoc */
app.editor.plugin.BasicImage.prototype.getTrogClassId = function() {
	return 'rtepluginBasicImage';
};

/** @inheritDoc */
app.editor.plugin.BasicImage.prototype.isSupportedCommand = function(command) {
	return command == app.editor.plugin.BasicImage.COMMAND;
};

/**
 * @public
 */
app.editor.plugin.BasicImage.getButton = function() {
	return goog.ui.editor.ToolbarFactory.makeButton(
		app.editor.plugin.BasicImage.COMMAND, 
		'Insert image', 
		'', 
		goog.getCssName('tr-icon tr-image')
	);
};

/** @inheritDoc */
app.editor.plugin.BasicImage.prototype.execCommandInternal = function(command) {
	var url = prompt("Image URL", "");

	if (url) {
		var div = this.getFieldDomHelper().createDom('div', {'class' : 'rte-image-container'},
			this.getFieldDomHelper().createDom('img', {'src' : url, 'class' : 'rte-image'})
		);

		this.getFieldObject().getRange().replaceContentsWithNode(div);
	}
};

/**
 * @public
 * @type {string}
 */
app.editor.plugin.BasicImage.COMMAND = '+editorimage';


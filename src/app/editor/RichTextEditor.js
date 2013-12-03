goog.provide('app.editor.RichTextEditor');

goog.require('goog.ui.Component');
goog.require('goog.editor.Command');
goog.require('goog.editor.Field');
goog.require('goog.ui.editor.DefaultToolbar');
goog.require('goog.ui.editor.ToolbarController');
goog.require('goog.editor.plugins.BasicTextFormatter');

goog.require('app.editor.plugin.BasicImage');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
app.editor.RichTextEditor = function() {
	goog.base(this);

	/** @private */
	this.editorId_ = 'rte-editor';

	/** @private */
	this.toolBarEl_ = this.dom_.createDom('div');

	/** @private */
	this.editorEl_ = this.dom_.createDom('div', {'id' : this.editorId_});

	/**
	* @type {goog.editor.Field?}
	* @private
	*/
	this.field_ = null;

	this.setElementInternal(this.dom_.createDom('div', null, 
		this.toolBarEl_,
		this.editorEl_
	));
};
goog.inherits(app.editor.RichTextEditor, goog.ui.Component);

/**
 * @public
 * @return {string}
 */
app.editor.RichTextEditor.prototype.getContent = function() {
	return this.field_.getCleanContents();
};

/**
 * @inheritDoc
 */
app.editor.RichTextEditor.prototype.enterDocument = function() {
	goog.base(this, 'enterDocument');

	this.field_ = new goog.editor.Field(this.editorId_);

	// Register a plugin
	this.field_.registerPlugin(new goog.editor.plugins.BasicTextFormatter());
	this.field_.registerPlugin(new app.editor.plugin.BasicImage());

	// Add some buttons to the tool bar
	var buttons   = [
		goog.editor.Command.BOLD, 
		goog.editor.Command.ITALIC,
		app.editor.plugin.BasicImage.getButton()
	];
	var myToolbar = goog.ui.editor.DefaultToolbar.makeToolbar(buttons, this.toolBarEl_);

	// Handle events from toolbar
	new goog.ui.editor.ToolbarController(this.field_, myToolbar);

	// Make the editor usable
	this.field_.makeEditable();
};

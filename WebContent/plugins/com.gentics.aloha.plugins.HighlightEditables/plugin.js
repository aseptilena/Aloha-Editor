/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/

GENTICS.Aloha.HighlightEditables = new GENTICS.Aloha.Plugin('com.gentics.aloha.plugins.highlighteditables');

/**
 * Initialize the plugin and set initialize flag on true
 */
GENTICS.Aloha.HighlightEditables.init = function () {

	// remember refernce to this class for callback
	var that = this;
	
	// highlight editables as long as the mouse is moving
	GENTICS.Utils.Position.addMouseMoveCallback(function () {
		if ( that.mouseMove() != false ) {
			for ( var i = 0; i < GENTICS.Aloha.editables.length; i++) {
				var editable = GENTICS.Aloha.editables[i].obj;
				if (!GENTICS.Aloha.activeEditable) {
					editable.addClass('GENTICS_editable_highlight');
				}
			}
		}
	});

	// fade editable borders when mouse stops moving
	GENTICS.Utils.Position.addMouseStopCallback(function () {
		if ( that.mouseStop() != false ) {
			that.fade();
		}
	});

	// mark active Editable with a css class
	GENTICS.Aloha.EventRegistry.subscribe(
			GENTICS.Aloha, 
			"editableActivated", 
			function (jEvent, aEvent) {
				aEvent.editable.obj.addClass('GENTICS_editable_active');
				that.fade();
			} 
	);

	// remove active EDitable ccs class
	GENTICS.Aloha.EventRegistry.subscribe(
			GENTICS.Aloha, 
			"editableDeactivated", 
			function (jEvent, aEvent) {
				aEvent.editable.obj.removeClass('GENTICS_editable_active');
			}
	);

};

/**
 * Called when the mouse is moving
 * You may overwrite this method with your own highlightening algorithmus.
 * @return void
 */
GENTICS.Aloha.HighlightEditables.mouseMove = function () {
	return true;
};

/**
 * will be called when the mouse has stopped moving
 * @return void
 */
GENTICS.Aloha.HighlightEditables.mouseStop = function () {
	return true;
};

/**
 * fades all highlighted editables
 */
GENTICS.Aloha.HighlightEditables.fade = function () {
	for ( var i = 0; i < GENTICS.Aloha.editables.length; i++) {
		var editable = GENTICS.Aloha.editables[i].obj;
		if (editable.hasClass('GENTICS_editable_highlight')) {
			editable.removeClass('GENTICS_editable_highlight')
				.css('outline', '5px solid #FFE767')
				.animate({
					outlineWidth : '0px'
				}, 300, 'swing', function () {
					jQuery(this).css('outline', '');
				});
		}
	}
};
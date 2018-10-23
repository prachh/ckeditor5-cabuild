/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module editor-classic/classiceditoruiview
 */

import BoxedEditorUIView from './../../ckeditor5-ui/src/editorui/boxed/boxededitoruiview';
import InlineEditableUIView from './../../ckeditor5-ui/src/editableui/inline/inlineeditableuiview';
import StickyPanelView from './../../ckeditor5-ui/src/panel/sticky/stickypanelview';
import ToolbarView from './../../ckeditor5-ui/src/toolbar/toolbarview';
import LabelView from './../../ckeditor5-ui/src/label/labelview';
import ResizeView from './../../ckeditor5-ui/src/resize/resizeview';
import uid from '@ckeditor/ckeditor5-utils/src/uid';

import '../theme/classiceditor.css';

/**
 * Classic editor UI view. Uses an inline editable and a sticky toolbar, all
 * enclosed in a boxed UI view.
 *
 * @extends module:ui/editorui/boxed/boxededitoruiview~BoxedEditorUIView
 */
export default class ClassicEditorUIView extends BoxedEditorUIView {
	/**
	 * Creates an instance of the classic editor UI view.
	 *
	 * @param {module:utils/locale~Locale} locale The {@link module:core/editor/editor~Editor#locale} instance.
	 */
	constructor(editor, locale ) {
		super( locale );

		/**
		 * Sticky panel view instance. This is a parent view of a {@link #toolbar}
		 * that makes toolbar sticky.
		 *
		 * @readonly
		 * @member {module:ui/panel/sticky/stickypanelview~StickyPanelView}
		 */
		this.stickyPanel = new StickyPanelView( locale );

		/**
		 * Toolbar view instance.
		 *
		 * @readonly
		 * @member {module:ui/toolbar/toolbarview~ToolbarView}
		 */
		this.toolbar = new ToolbarView( locale );

		/**
		 * Editable UI view.
		 *
		 * @readonly
		 * @member {module:ui/editableui/inline/inlineeditableuiview~InlineEditableUIView}
		 */
		this.editable = new InlineEditableUIView( locale );

		const ariaLabelUidForWordCount = uid();
		/**
		 * Voice label of the UI.
		 *
		 * @protected
		 * @readonly
		 * @member {module:ui/view~View} #_voiceLabelView
		 */
		this._voiceLabelViewForWordCount = this._createVoiceLabel( ariaLabelUidForWordCount );
		this._voiceLabelViewForWordCount.text = 'Words entered: 0';
		this.wordCount = new LabelView( locale );
		this.wordCount.text =  'Words entered: 0';

		this.wordCount.extendTemplate( {
			attributes: {
				class: 'wordCount',
				'aria-labelledby': `ck-editor__aria-label_${ ariaLabelUidForWordCount }`
			},
		} );

		this.maxword = editor.config.get( 'maxword' );
		this.minword = editor.config.get( 'minword' );

		const ariaLabelUidForMaxMin = uid();
		/**
		 * Voice label of the UI.
		 *
		 * @protected
		 * @readonly
		 * @member {module:ui/view~View} #_voiceLabelView
		 */
		this._voiceLabelViewForMaxMin = this._createVoiceLabel( ariaLabelUidForMaxMin );
		this._voiceLabelViewForMaxMin.text =  `Min: ${ this.minword } / Max: ${ this.maxword }`;
		
		this.wordMinMax = new LabelView( locale );
		this.wordMinMax.text = `Min: ${ this.minword } / Max: ${ this.maxword }`;
		this.wordMinMax.extendTemplate( {
			attributes: {
				class: 'wordMinMax',
				'aria-labelledby': `ck-editor__aria-label_${ ariaLabelUidForMaxMin }`
			},
			
		} );

		this.resize=new ResizeView ( locale );
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		// Set toolbar as a child of a stickyPanel and makes toolbar sticky.
		this.stickyPanel.content.add( this.toolbar );


		this.top.add( this.stickyPanel );
		this.main.add( this.editable );
		this.bottom.add( this.resize );
		this.wordsummary.add( this.wordCount );
		this.wordsummary.add( this._voiceLabelViewForWordCount );
		this.wordsummary.add( this.wordMinMax );
		this.wordsummary.add( this._voiceLabelViewForMaxMin );
	}

	/**
	 * @inheritDoc
	 */
	get editableElement() {
		return this.editable.element;
	}

	
	/**
	 * Creates a voice label view instance.
	 *
	 * @private
	 * @returns {module:ui/label/labelview~LabelView}
	 */
	_createVoiceLabel( ariaLabelUid ) {
		const t = this.t;
		const voiceLabel = new LabelView();
		voiceLabel.extendTemplate( {
			attributes: {
				id: `ck-editor__aria-label_${ ariaLabelUid }`,
				class: 'ck-voice-label'
			}
		} );

		return voiceLabel;
	}
}

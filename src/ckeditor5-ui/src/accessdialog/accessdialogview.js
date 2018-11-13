/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module ui/label/labelview
 */

import View from '../view'; 
import ButtonView from '../button/buttonview';

import '../../theme/components/accessdialog/accessdialog.css'

/**
 * The label view class.
 *
 * @extends module:ui/view~View
 */
export default class AccessDialogView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale, editor ) {
		super( locale );
		const t = editor.t;
		

		const bind = this.bindTemplate;

		const closeview = new ButtonView( locale );
		
		const EscCOMMAND = 'EscCommand'; 
		const command = editor.commands.get( EscCOMMAND );
            	
		closeview.set( {
				label: 'Close',
				buttontext: 'X',
				isVisible: true,
				withbuttontext: true,
				closebutton: true,
			} );

			closeview.extendTemplate( {
				attributes: {
					class: 'cke_dialog_close'
				}
			} );

			// Execute command.
			this.listenTo( closeview, 'execute', () => editor.execute(EscCOMMAND) );

		this.setTemplate( {
			tag: 'div',
			attributes: {
				class: [
					'ck',
					'cke_dialog'
				]
			},
			children: [
				{
					tag: 'div',
	 				attributes: {
	 						class: 'cke_dialog_body'
	 				},
	 				children: [
						{
							tag: 'div',
							 attributes: {
									 class: 'cke_dialog_title'
							 },
							 children: [
								 'Accessibility Instructions',
								 closeview
							 ]
						},

						{
							tag: 'div',
							 attributes: {
									 class: 'cke_dialog_contents_body'
							 },
							 children: [
								 
						
						{
							tag: 'div',
							 attributes: {
									 class: 'cke_dialog_contents'
							 },
							 children: [
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_heading'
									 },
									 children: [
										 'General'
									 ]
								},		
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										 'Editor Toolbar'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Press Alt+F10 to navigate to the toolbar. Move to the next and previous toolbar group with TAB and SHIFT+TAB. Move to the next and previous toolbar button with RIGHT ARROW or LEFT ARROW. Press SPACE or ENTER to activate the toolbar button.'
									 ]
								},		
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										 'Editor Context Menu'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Press Shift+F10 / Shift+Command+F10 or APPLICATION KEY to open context-menu. Then move to next menu option with TAB or DOWN ARROW. Move to previous option with SHIFT+TAB or UP ARROW. Press SPACE or ENTER to select the menu option. Open sub-menu of current option with SPACE or ENTER or RIGHT ARROW. Go back to parent menu item with ESC or LEFT ARROW. Close context menu with ESC.'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										 'Editor List Box'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Inside a list-box, move to next list item with TAB OR DOWN ARROW. Move to previous list item with SHIFT+TAB or UP ARROW. Press SPACE or ENTER to select the list option. Press ESC to close the list-box.'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										 'Editor Element Path Bar'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Press Alt+F11 to navigate to the elements path bar. Move to next element button with TAB or RIGHT ARROW. Move to previous button with SHIFT+TAB or LEFT ARROW. Press SPACE or ENTER to select the element in editor.'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_heading'
									 },
									 children: [
										 'Commands'
									 ]
								},		
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										 'Undo command'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Press Command+Z'
									 ]
								},		
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										 'Redo command'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Press Command+Y / Shift+Command+Z'
									 ]
								},		
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										 'Bold command'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Press Command+B'
									 ]
								},		
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										 'Italic command'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Press Command+I'
									 ]
								},
										
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										 'Underline command'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Press Command+U'
									 ]
								},
										
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										 'Link command'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Press Command+K / Command+L'
									 ]
								},
								
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										'Access previous focus space command'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Press Shift+Command+3 to access the closest unreachable focus space before the caret, for example: two adjacent HR elements. Repeat the key combination to reach distant focus spaces.'
									 ]
								},

								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										 'Access next focus space command'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Press Shift+Command+4 to access the closest unreachable focus space after the caret, for example: two adjacent HR elements. Repeat the key combination to reach distant focus spaces.'
									 ]
								},

								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										 'Accessibility Help'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Press Alt+0'
									 ]
								},

								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_subheading'
									 },
									 children: [
										 'Paste as plain text'
									 ]
								},
								{
									tag: 'div',
									 attributes: {
											 class: 'cke_dialog_contents'
									 },
									 children: [
										 'Press Shift+Command+V'
									 ]
								},
							 ]
						}
						
					]
				},
				{
					tag: 'div',
					 attributes: {
							 class: 'cke_dialog_title'
					 },
					 children: [
						 ''
					 ]
				},
	 				]
				},
				
			]
		} );
	}
}

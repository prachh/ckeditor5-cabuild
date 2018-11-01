import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '../../../ckeditor5-ui/src/button/buttonview';
import MaximizeCommand from '../maximize/MaximizeCommand';

const CONTINUE = 'continue';


export default class ContinueUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {

		//console.log( 'ContinueUI was initialized' );

		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( CONTINUE, locale => {
			const view = new ButtonView( locale );

			
		// Create Maximize command.
		editor.commands.add( CONTINUE, new MaximizeCommand(this.editor,view) );

		const command = editor.commands.get( CONTINUE );
            	
            view.set( {
				label: t( 'Continue' ),
				buttontext: 'Continue',
				isVisible: false,
				withbuttontext: true
			} );
			
			view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );
			// Execute command.
			this.listenTo( view, 'execute', () => editor.execute(CONTINUE) );

			return view;
		} );
		
	}
}

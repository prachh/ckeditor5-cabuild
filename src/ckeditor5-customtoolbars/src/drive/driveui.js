import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import driveIcon from '../../theme/icons/drive.svg'
import DriveCommand from './driveCommand';

const DRIVE = 'drive';


export default class DriveUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {

		console.log( 'DriveUI was initialized' );

		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( DRIVE, locale => {
			const view = new ButtonView( locale );

			
		// Create DRIVE command.
		editor.commands.add( DRIVE, new DriveCommand(this.editor,view) );

		// Set the Ctrl+D keystroke.
		editor.keystrokes.set( 'CTRL+D', DRIVE );


			const command = editor.commands.get( DRIVE );
            	
            view.set( {
                label: t( 'Drive' ),
				icon: driveIcon,
				keystroke: 'CTRL+D',
				tooltip: true
			} );
			
			view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );
			// Execute command.
			this.listenTo( view, 'execute', () => editor.execute(DRIVE) );

			return view;
		} );
		
	}
}

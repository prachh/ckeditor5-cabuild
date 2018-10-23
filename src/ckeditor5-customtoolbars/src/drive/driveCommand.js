
import Command from '@ckeditor/ckeditor5-core/src/command';

export default class DriveCommand extends Command {

	constructor(editor, view) {
		super(editor );
		this.e=editor;		
		this.view=view;
	}
	execute( options = {} ) {

		alert("Google Drive Implementation");
	}
}

import Command from '@ckeditor/ckeditor5-core/src/command';
import global from '@ckeditor/ckeditor5-utils/src/dom/global';


export default class DialogCommand extends Command {

	constructor(editor) {
		super(editor);
		this.e=editor;	
	}
	execute( options = {} ) {
		this.e.ui.view.accessibilitymodel._items[0].element.style.display="block";

	}
			
}

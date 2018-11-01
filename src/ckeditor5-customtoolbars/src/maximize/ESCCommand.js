
import Command from '@ckeditor/ckeditor5-core/src/command';


export default class ESCCommand extends Command {

	constructor(editor, view) {
        super(editor);
        this.e=editor;		
		this.view=view;
	}
	execute( options = {} ) {
        this.e.ui.view.toolbar.items._items[5].element.classList.add("ck-hidden");
        this.view.element.classList.remove("ck-on");
        this.view.element.classList.add("ck-off");
        this.e.sourceElement.nextSibling.classList.remove("ckeditorfullsize");
        this.e.sourceElement.nextSibling.style="";
        this.e.sourceElement.nextSibling.children[2].children[0].style="";
        document.getElementsByTagName('html')[0].style.overflow = ''
	}
			
}
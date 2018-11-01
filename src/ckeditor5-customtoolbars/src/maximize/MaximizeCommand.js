
import Command from '@ckeditor/ckeditor5-core/src/command';
import global from '@ckeditor/ckeditor5-utils/src/dom/global';


export default class MaximizeCommand extends Command {

	constructor(editor, view) {
		super(editor );
		this.e=editor;		
		this.view=view;
	}
	execute( options = {} ) {

		if(this.e.sourceElement.nextSibling.classList.contains("ckeditorfullsize"))
			{
				this.e.ui.view.toolbar.items._items[5].element.classList.add("ck-hidden");
				this.view.element.classList.remove("ck-on");
				this.view.element.classList.add("ck-off");
				this.e.sourceElement.nextSibling.classList.remove("ckeditorfullsize");
				this.e.sourceElement.nextSibling.style="";
				this.e.sourceElement.nextSibling.children[3].children[0].style="";
				document.getElementsByTagName('html')[0].style.overflow = ''
				this.e.ui.view.toplabels._parentElement.classList.add("ck-hidden")
				this.e.ui.view.wordsummary._parentElement.classList.remove("ck-hidden")
			}
			else
			{
				this.e.ui.view.toplabels._parentElement.classList.remove("ck-hidden")
				this.e.ui.view.wordsummary._parentElement.classList.add("ck-hidden")
				this.e.ui.view.toolbar.items._items[5].element.classList.remove("ck-hidden");
				this.view.element.classList.remove("ck-off");
				this.view.element.classList.add("ck-on");
				this.e.sourceElement.nextSibling.classList.add("ckeditorfullsize");
				 var heightvalue = window.innerHeight - this.e.sourceElement.nextSibling.children[1].offsetHeight - 40;
				 var stylevalue= "height: " + heightvalue + "px !important;";
				 var fullstyle="display: block; z-index: 999; position: fixed; left: 0px; top: 0px; width: 100%;";
				 this.e.sourceElement.nextSibling.style=fullstyle;
				 document.getElementsByTagName('html')[0].style.overflow = 'hidden';
				 //document.getElementsByClassName('ck-content')[0].style.height = window.innerHeight;
				 this.e.sourceElement.nextSibling.children[3].children[0].style=stylevalue;
			}
	}
			
}

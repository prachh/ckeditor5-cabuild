
import Command from '@ckeditor/ckeditor5-core/src/command';
import global from '@ckeditor/ckeditor5-utils/src/dom/global';


export default class MaximizeCommand extends Command {

	constructor(editor, view) {
		super(editor );
		this.e=editor;		
		this.view=view;
	}
	execute( options = {} ) {
		console.log(this.e.sourceElement.nextSibling.classList);
		console.log(global.window);

		console.log(global.document);
		console.log(this.e);
		if(this.e.sourceElement.nextSibling.classList.contains("ckeditorfullsize"))
			{
				this.view.element.classList.remove("ck-on");
				this.view.element.classList.add("ck-off");
				this.e.sourceElement.nextSibling.classList.remove("ckeditorfullsize");
				this.e.sourceElement.nextSibling.style="";
				this.e.sourceElement.nextSibling.children[2].children[0].style="";
			}
			else
			{
				
				this.view.element.classList.remove("ck-off");
				this.view.element.classList.add("ck-on");
				this.e.sourceElement.nextSibling.classList.add("ckeditorfullsize");
				 var heightvalue = window.innerHeight - this.e.sourceElement.nextSibling.children[1].offsetHeight - 2;
				 var stylevalue= "height: " + heightvalue + "px;";
				 var fullstyle="display: block; z-index: 999; position: absolute; left: 0px; top: 0px; width: " +  window.innerWidth + "px;";
				 this.e.sourceElement.nextSibling.style=fullstyle;
				 this.e.sourceElement.nextSibling.children[2].children[0].style=stylevalue;
			}
	}
}
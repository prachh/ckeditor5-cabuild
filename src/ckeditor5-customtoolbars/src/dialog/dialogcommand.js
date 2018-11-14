
import Command from '@ckeditor/ckeditor5-core/src/command';
import global from '@ckeditor/ckeditor5-utils/src/dom/global';


export default class DialogCommand extends Command {

	constructor(editor) {
		super(editor);
		this.e=editor;	
	}
	execute( options = {} ) {
		this.e.ui.view.accessibilitymodel._items[0].element.style.display="block";

		this.e.ui.view.accessibilitymodel._items[0].element.children[0].children[0].children[0].tabIndex="0"
		this.e.ui.view.accessibilitymodel._items[0].element.children[0].children[1].tabIndex="0";

		this.e.ui.view.accessibilitymodel._items[0].element.children[0].children[1].focus();

		this.e.ui.view.accessibilitymodel._items[0].element.children[0].children[1].onkeydown=function(value){
			if(value.keyCode === 9)
			{
				var eventarget = value.srcElement.previousSibling.children[0];
				eventarget.focus();
				value.preventDefault();
			}
			else if(value.keyCode === 27)
			{
				value.srcElement.parentNode.parentNode.style.display='none';
				var eventarget = value.srcElement.parentNode.parentNode.parentNode.parentNode.children[3].children[0];
				eventarget.focus();
			}
		}

	}
			
}

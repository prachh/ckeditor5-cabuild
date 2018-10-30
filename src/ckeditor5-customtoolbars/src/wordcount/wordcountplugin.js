import Plugin from '@ckeditor/ckeditor5-core/src/plugin';


export default class WordCountPlugin extends Plugin {
	/**
	 * @inheritDoc
	 */
	afterInit() {
		const editor = this.editor;

        editor.model.document.on( 'change', () => {
			editor.ui.view.wordsummary._items[0].text="Words entered: " + this.editor.ui.editor.getwordcount();
        });
		
	}
}

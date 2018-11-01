import Plugin from '@ckeditor/ckeditor5-core/src/plugin';


export default class WordCountPlugin extends Plugin {
	/**
	 * @inheritDoc
	 */
	afterInit() {
		const editor = this.editor;
		const maxword = editor.config.get( 'maxword' );
        editor.model.document.on( 'change', () => {
			editor.ui.view.wordsummary._items[2].text= this.editor.ui.editor.getwordcount() + "/" + maxword + " words";
			editor.ui.view.toplabels._items[2].text= this.editor.ui.editor.getwordcount() + "/" + maxword + " words";
        });
		
	}
}

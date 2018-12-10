import Plugin from '@ckeditor/ckeditor5-core/src/plugin';


export default class WordCountPlugin extends Plugin {
	/**
	 * @inheritDoc
	 */
	afterInit() {
		const editor = this.editor;
		const maxword = editor.config.get( 'maxword' );
		const minword = editor.config.get( 'minword' );
        editor.model.document.on( 'change', () => {
			const totalword=this.editor.ui.editor.getwordcount();

			editor.ui.view.wordsummary._items[2].text= totalword + "/" + maxword + " words";
			editor.ui.view.toplabels._items[2].text= totalword + "/" + maxword + " words";
			editor.ui.view.toplabels._items[3].element.classList.add("ck-hidden");

			if(totalword < minword)
			{
				editor.ui.view.toplabels._items[3].element.classList.remove("ck-hidden");
				editor.ui.view.toplabels._items[3].text= "Add "+ (minword - totalword) +  " or more words to meet the " + minword + " word minimum."
			}
			else if(totalword > maxword)
			{
				editor.ui.view.toplabels._items[3].element.classList.remove("ck-hidden");
				editor.ui.view.toplabels._items[3].text= "Remove "+ (totalword-maxword) +" or more words to meet the " + maxword + " word maximum."
			}
			

        });
		
	}
}

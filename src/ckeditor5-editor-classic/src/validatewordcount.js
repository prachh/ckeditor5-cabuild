const ValidateWordCountApiMixin = {
	
	getwordcount() {
        
        
		this.htmlFromEditor = this.data.get();
		this.wordLen = 0;

        this.htmlFromEditor = this.htmlFromEditor.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace("&nbsp;", " ");

        this.tmp = document.createElement("div");
        this.tmp.innerHTML = this.htmlFromEditor;

        if (this.tmp.textContent == "" && typeof this.tmp.innerText == "undefined") {
            this.htmlFromEditor = "";
        }
        else {
            this.htmlFromEditor = this.tmp.textContent || this.tmp.innerText;
        }

        this.words = this.htmlFromEditor.split(/\s+/);

        for (var wordIndex = this.words.length - 1; wordIndex >= 0; wordIndex--) {
            if (this.words[wordIndex].match(/^([\s\t\r\n]*)$/)) {
                this.words.splice(wordIndex, 1);
            }
        }

        this.wordLen = this.words.length;
        console.log(this.wordLen);
        return this.wordLen;
	}

};

export default ValidateWordCountApi;

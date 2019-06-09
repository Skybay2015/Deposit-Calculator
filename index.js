class Main {
    constructor(table) {
        this.table = table;
        this.table.addEventListener('click', this.selectPart.bind(this), true);
        this.currentTd = null;
    }

    selectPart(e) {
        let target = e.target;
        let elements = this._createElements();
        if (target.closest('td')) {
            if (this.currentTd) return;
            let td = target.closest('td');
            let tdParent = td.parentElement;
            this.currentTd = td;

            elements.okBtn.innerHTML = 'Ok';
            elements.cancelBtn.innerHTML = 'Cancel';

            elements.okBtn.addEventListener(
                'click',
                this._onOk.bind(
                    this,
                    elements.textarea,
                    elements.cancelBtn,
                    elements.okBtn,
                ),
            );
            elements.cancelBtn.addEventListener(
                'click',
                this._cancelBtn.bind(
                    this,
                    elements.textarea,
                    elements.cancelBtn,
                    elements.okBtn,
                ),
            );

            elements.textarea.value = td.innerHTML;
            elements.textarea.style.height =
                td.offsetHeight - 4 + 'px';
            elements.textarea.style.width =
                td.clientWidth - 6 + 'px';
            td.style.display = 'none';

            tdParent.insertBefore(elements.textarea, td);
            elements.textarea.insertAdjacentElement(
                'afterend',
                elements.okBtn,
            );
            elements.textarea.insertAdjacentElement(
                'afterend',
                elements.cancelBtn,
            ),
                elements.textarea.focus();
        }
    }

    _createElements () {
        return {
            textarea : document.createElement('textarea'),
            okBtn : document.createElement('button'),
            cancelBtn: document.createElement('button')

        }
    }

    _onOk(textarea, cnclBtn, okBtn) {
        
        textarea.remove();
        cnclBtn.remove();
        okBtn.remove();

        this.currentTd.innerHTML = textarea.value;
        
        this.currentTd.style.display = '';
        this.currentTd = null;
        
    }

    _cancelBtn(textarea, cnclBtn, okBtn) {
        textarea.remove();
        cnclBtn.remove();
        okBtn.remove();

        this.currentTd.style.display = '';
        this.currentTd = null;
    }
}


let obj = new Main ( 
    document.querySelector('#bagua-table')
)
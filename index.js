class Main {
    constructor(options) {
        this.input = options.input;
        this.select = options.select;
        this.checkbox = options.checkbox;
        this.moneyBefore = options.moneyBefore;
        this.moneyAfter = options.moneyAfter;
        this.heightAfter = options.heightAfter;


        this._monthlyIncrease = 0.01;

        this.moneyBefore.innerHTML = this.input.value 

        this.input.addEventListener(
            'keypress',
            this.writeOnlyNumbers.bind(this),
        );
        this.input.addEventListener(
            'input',
            this.writeMoneyBefore.bind(this),
        );
        
        this.select.addEventListener('change', this.writeMoneyAfter.bind(this));
        this.checkbox.addEventListener('click', this.writeMoneyAfter.bind(this));


        this.writeMoneyAfter();
    }

    writeOnlyNumbers(e) {
        e.preventDefault();
        if (e.keyCode < 48 || e.keyCode > 57) return;
        this.input.value += this._getChar(e);
        this.moneyBefore.innerHTML = this.input.value;

        this.writeMoneyAfter()
    }

    writeMoneyBefore() {
        if (!this.input.value) {
            this.moneyBefore.textContent = 0;
            console.log('works');
        } else {
            this.moneyBefore.innerHTML = this.input.value;
            this.writeMoneyAfter();
        }
        
    }

    writeMoneyAfter() {
        const money = +this.input.value;

        let months = this.select.value;
        let sum = money;

        if (this.checkbox.checked) {
            for (let i = 0; i < months; i++) {
                sum = sum * (1 + this._monthlyIncrease);
          } 
        } else {
          sum = money * (1 + this._monthlyIncrease * months);
        } 
        sum = Math.round(sum);

        this.moneyAfter.innerHTML = sum;
        this.heightAfter.style.height = `${sum/money * 100}px`
    }

    _getChar(event) {
        if (event.which == null) {
            if (event.keyCode < 32) return null;
            return String.fromCharCode(event.keyCode); // IE
        }

        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32) return null;
            return String.fromCharCode(event.which); // остальные
        }

        return null; // специальная клавиша
    }
}




let obj = new Main( {
    input: document.querySelector('input[name="money"]'),
    select: document.querySelector('select[name="months"]'),
    checkbox: document.querySelector('input[name="capitalization"]'),
    moneyBefore: document.querySelector('#money-before'),
    moneyAfter: document.querySelector('#money-after'),
    heightAfter: document.querySelector('#height-after')
})
    
    

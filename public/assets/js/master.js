//Component for each key
Vue.component('key', {
    props: {
        value: {
            type: String,
            required: true
        },
        keyType: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    template: `
        <div @click="updateInput(value)" :class="keyType" :id="key.name">{{value}}</div>
    `,
    data() {

    },
    methods: {
        updateInput(value) {
            this.$emit('update-input', value);
        }
    }
})

Vue.component('calculator', {
    props: ["currentInput", "history", "currentOp"],
    template: `
    <div class="container">
        <div class="calculator">
            <div id="output">
                <small id="history">{{ history }} {{ currentOp }}</small>
                {{ currentInput }}
            </div>

            <div class="controls">
                <div class="parent">
                    <template v-for="(keyType, index) in keyTypes">
                    <div :class="keyType">
                        <template v-for="key in keys[index]">
                            <div @click="updateInput(key.value)" :class="key.keyType" :id="key.name">{{key.value}}</div>
                        </template>
                    </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            keyTypes: ['numbs', 'ops', 'mods'],
            keys: [
                [{
                        keyType: 'btn btn-numb',
                        value: '7',
                        name: 'seven'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: '8',
                        name: 'eight'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: '9',
                        name: 'nine'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: '4',
                        name: 'four'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: '5',
                        name: 'five'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: '6',
                        name: 'six'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: '1',
                        name: 'one'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: '2',
                        name: 'two'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: '3',
                        name: 'three'
                    },
                    {

                        keyType: 'btn btn-numb',
                        value: '0',
                        name: 'zero'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: ',',
                        name: 'comma'
                    },
                ],
                [{
                        keyType: 'btn btn-op',
                        value: '/',
                        name: 'divide'
                    },
                    {
                        keyType: 'btn btn-op',
                        value: 'X',
                        name: 'multiply'
                    },
                    {
                        keyType: 'btn btn-op',
                        value: '-',
                        name: 'substract'
                    },
                    {
                        keyType: 'btn btn-op',
                        value: '+',
                        name: 'add'
                    },
                    {
                        keyType: 'btn btn-op',
                        value: '=',
                        name: 'equal'
                    }
                ],
                [{
                        keyType: 'btn btn-mod',
                        value: 'C',
                        name: 'clear'
                    },
                    {
                        keyType: 'btn btn-mod',
                        value: 'AC',
                        name: 'allClear'
                    },
                    {
                        keyType: 'btn btn-mod',
                        value: '+/-',
                        name: 'reverse'
                    },
                    {
                        keyType: 'btn btn-mod',
                        value: '%',
                        name: 'percent'
                    }
                ]
            ]
        }
    },
    computed: {


    },
    methods: {
        updateInput(value) {
            this.$emit('update-input', value);
        },
    }
})

let app = new Vue({
    el: '#app',
    data: {
        history: '',
        currentInput: '',
        currentOp: ''
    },
    methods: {
        updateInput(value) {
            switch (value) {
                case ',':
                    if (!(this.currentInput).includes('.'))
                        this.currentInput = this.currentInput + '.';
                    break;
                case '+':
                    this.history = this.currentInput ? this.getFormattedNumber(this.reverseFormat(this.history) + this.reverseFormat(this.currentInput)) : '';
                    this.currentOp = this.currentInput ? '+' : '';
                    this.currentInput = '';
                    this.changeSize(this.history, 'history');
                    break;
                case '-':
                    if (this.history !== '' && this.currentInput !== '')
                        this.history = this.getFormattedNumber(this.reverseFormat(this.history) - this.reverseFormat(this.currentInput));
                    else this.history = this.currentInput ? this.currentInput : this.history;
                    this.currentOp = this.currentInput ? '-' : '';
                    this.currentInput = '';
                    this.changeSize(this.history, 'history');
                    break;
                case 'X':
                    if (this.history !== '' && this.currentInput !== '')
                        this.history = this.getFormattedNumber(this.reverseFormat(this.history) * this.reverseFormat(this.currentInput));
                    else this.history = this.currentInput ? this.currentInput : this.history;
                    this.currentOp = this.currentInput ? 'X' : '';
                    this.currentInput = '';
                    this.changeSize(this.history, 'history');
                    break;
                case '/':
                    if (this.history !== '' && this.currentInput !== '')
                        this.history = this.getFormattedNumber(this.reverseFormat(this.history) / this.reverseFormat(this.currentInput));
                    else this.history = this.currentInput ? this.currentInput : this.history;
                    this.currentOp = this.currentInput ? '/' : '';
                    this.currentInput = '';
                    this.changeSize(this.history, 'history');
                    break;
                case '=':
                    this.currentInput = this.getFormattedNumber(this.dynamicCompute(this.currentOp, this.reverseFormat(this.history), this.reverseFormat(this.currentInput)));
                    this.changeSize(this.currentInput, 'output');
                    this.currentOp = '';
                    this.history = '';
                    break;
                case 'C':
                    this.currentInput = '';
                    this.changeSize(this.currentInput, 'output');
                    break;
                case 'AC':
                    this.currentInput = '';
                    this.history = '';
                    this.currentOp = '';
                    this.changeSize(this.currentInput, 'output');
                    break;
                case '+/-':
                    if (this.currentInput != '')
                        if (!this.currentInput.includes('-'))
                            this.currentInput = '-' + this.currentInput;
                        else this.currentInput = this.currentInput.replace('-', '');
                    break;
                case '%':
                    this.currentInput = this.currentInput / 100;
                    this.changeSize(this.currentInput, 'output');
                    break;
                default:
                    this.changeSize(this.currentInput, 'output');
                    if (!((this.currentInput).includes('.'))) {
                        this.currentInput = this.getFormattedNumber(this.currentInput + value);
                    } else {
                        this.currentInput = this.currentInput + value;
                    }
                    break;
            }

            let AC = document.getElementById('allClear');
            let C = document.getElementById('clear');
            if (this.currentInput == '') {
                AC.style.display = 'flex';
                C.style.display = 'none';
            } else {
                AC.style.display = 'none';
                C.style.display = 'flex';
            }
        },
        reverseFormat(number) {
            return Number(number.replace(/,/g, ''));
        },

        changeSize(number, element) {
            let output = document.getElementById(element);
            if (element == 'output') {
                if (number == '') {
                    output.style.fontSize = '4rem';
                } else if (number.length > 10) {
                    output.style.fontSize = '2rem';
                } else if (number.length > 6) {
                    output.style.fontSize = '2.5rem';
                }
            } else if (element == 'history') {
                if (number == '') {
                    output.style.fontSize = '2rem';
                } else if (number.length > 12) {
                    output.style.fontSize = '1.5rem';
                } else if (number.length > 8) {
                    output.style.fontSize = '1.8rem';
                }
            }
        },
        getFormattedNumber(number) {
            let n = Number(number);
            if (number > 0.1) {
                value = n.toLocaleString('en');
                return value;
            }
            return number;
        },

        dynamicCompute(op, a, b) {
            let operators = {
                '+': function (a, b) {
                    return a + b
                },
                '-': function (a, b) {
                    return a - b
                },
                'X': function (a, b) {
                    return a * b
                },
                '/': function (a, b) {
                    return a / b
                }

            };
            return operators[op](a, b);
        }

        //         dynamicSwitch(op, a, b) {

        //     let localHistory = this.history;
        //     let localCurrentInput = this.currentInput;
        //     let path = op == '=' ? localCurrentInput : localHistory;

        //     if (localHistory !== '' && localCurrentInput !== '') {
        //         path = this.getFormattedNumber(this.dynamicCompute(op, a, b));
        //     } else localHistory = localCurrentInput ? localCurrentInput : localHistory;

        //     if (op == '=') {
        //         this.changeSize(localCurrentInput, 'output');
        //         localHistory = '';
        //         this.currentOp = '';
        //     } else {
        //         this.changeSize(this.history, 'history');
        //         localCurrentInput = '';
        //         this.currentOp = localCurrentInput ? op : '';
        //     }
        // },
    }
})
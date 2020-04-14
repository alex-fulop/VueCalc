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
            <div class="output">
                <small class="history">{{ history }} {{ currentOp }}</small>
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
                        value: 9,
                        name: 'nine'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: 8,
                        name: 'eight'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: 7,
                        name: 'seven'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: 6,
                        name: 'six'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: 5,
                        name: 'five'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: 4,
                        name: 'four'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: 3,
                        name: 'three'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: 2,
                        name: 'two'
                    },
                    {
                        keyType: 'btn btn-numb',
                        value: 1,
                        name: 'one'
                    },
                    {

                        keyType: 'btn btn-numb',
                        value: 0,
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
        history: 0,
        currentInput: 0,
        currentOp: ''
    },
    methods: {
        updateInput(value) {
            switch (value) {
                case ',':
                    if (Number.isInteger(this.currentInput)) {
                        this.currentInput = this.currentInput.toFixed() + '.';
                        console.log(this.currentInput);
                    }
                    break;
                case '+':
                    if (this.history)
                        this.history = this.history + parseFloat(this.currentInput);
                    else this.history = parseFloat(this.currentInput);
                    this.currentOp = '+';
                    this.currentInput = 0;
                    break;
                case '-':
                    if (this.history)
                        this.history = this.history - parseFloat(this.currentInput);
                    else this.history = parseFloat(this.currentInput);
                    this.currentInput = 0;
                    this.currentOp = '-';
                    break;
                case 'X':
                    if (this.history)
                        this.history = parseFloat(this.currentInput) * this.history;
                    else this.history = parseFloat(this.currentInput);
                    this.currentInput = 0;
                    this.currentOp = 'X';
                    break;
                case '/':
                    if (this.history)
                        this.history = parseFloat(this.currentInput) / this.history;
                    else this.history = parseFloat(this.currentInput);
                    this.currentInput = 0;
                    this.currentOp = '/';
                    break;
                case '=':
                    this.currentInput = parseFloat(this.currentInput);
                    switch (this.currentOp) {
                        case '+':
                            console.log(this.history + this.currentInput);
                            this.currentInput = this.history + this.currentInput;
                            break;
                        case '-':
                            this.currentInput = this.history - this.currentInput;
                            break;
                        case 'X':
                            this.currentInput = this.history * this.currentInput;
                            break;
                        case '/':
                            this.currentInput = this.history / this.currentInput;
                            this.currentInput = this.currentInput.toFixed(6);
                            break;
                    }
                    this.currentOp = '';
                    this.history = 0;
                    break;
                case 'C':
                    this.currentInput = 0;
                    break;
                case 'AC':
                    this.currentInput = 0;
                    this.history = 0;
                    this.currentOp = '';
                    break;
                case '+/-':
                    this.currentInput = -parseFloat(this.currentInput);
                    break;
                case '%':
                    this.currentInput = parseFloat(this.currentInput) / 100;
                    break;
                default:
                    this.currentInput = parseFloat(this.currentInput);
                    if (Number.isInteger(this.currentInput))
                        this.currentInput = this.currentInput * 10 + value;
                    else {
                        this.currentInput = (this.currentInput + value);
                    }
                    break;
            }
            let AC = document.getElementById('allClear');
            let C = document.getElementById('clear');
            if (this.currentInput == 0) {
                AC.style.display = 'flex';
                C.style.display = 'none';
            } else {
                AC.style.display = 'none';
                C.style.display = 'flex';
            }
        }
    }
})
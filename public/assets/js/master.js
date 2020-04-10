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
        <div @click="updateInput(value)" :class="keyType">{{value}}</div>
    `,
    data() {
        btnNumb = {
            'btn btn-mod': {
                'clear': 'C',
                'AllClear': 'AC',
                'Reverse': '+/-',
                'percent': '%'
            },
            'btn btn-op': {
                'divide': '/',
                'multiply': 'X',
                'substract': '-',
                'add': '+'
            },
            'btn btn-numb': {
                'zero': 0,
                'one': 1,
                'two': 2,
                'three': 3,
                'four': 4,
                'five': 5,
                'six': 6,
                'seven': 7,
                'eight': 8,
                'nine': 9
            }


        }
    },
    methods: {
        updateInput(value) {
            this.$emit('update-input', value);
        }
    }
})

Vue.component('calculator', {
    props: ["currentInput"],
    template: `
    <div class="container">
        <div class="calculator">
            <div class="output">
                {{ currentInput }}
            </div>

            <div class="controls">
                <div class="container numbs">
                    <div class="row">
                        <div id="clear" class="btn btn-mod">AC</div>
                        <div id="allClear" class="btn btn-mod">AC</div>
                        <div id="reverse" class="btn btn-mod">+/-</div>
                        <div id="percent" class="btn btn-mod">%</div>
                        <div id="divide" class="btn btn-op">/</div>
                    </div>
                    <div class="row">
                        <div id="seven" class="btn btn-numb">7</div>
                        <div @click="updateInput" id="eight" class="btn btn-numb">8</div>
                        <div id="nine" class="btn btn-numb">9</div>
                        <div id="multiply" class="btn btn-op">X</div>
                    </div>
                    <div class="row">
                        <div @click="updateInput(4)" id="four" class="btn btn-numb">4</div>
                        <div @click="updateInput(5)" id="five" class="btn btn-numb">5</div>
                        <div @click="updateInput(6)" id="six" class="btn btn-numb">6</div>
                        <div @click="updateInput('-')" id="substract" class="btn btn-op">-</div>
                    </div>
                    <div class="row">
                        <div id="one" class="btn btn-numb">1</div>
                        <div id="two" class="btn btn-numb">2</div>
                        <div id="three" class="btn btn-numb">3</div>
                        <div id="add" class="btn btn-op">+</div>
                    </div>
                    <div class="row">
                        <div id="zero" class="btn btn-numb">0</div>
                        <div id="comma" class="btn btn-numb">,</div>
                        <div id="equal" class="btn btn-op">=</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {}
    },
    methods: {
        updateInput(value) {
            this.$emit('update-input', value);
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        currentInput: 0,
    },
    methods: {
        updateInput(value) {
            this.currentInput = this.currentInput * 10 + value;
        }
    }

})
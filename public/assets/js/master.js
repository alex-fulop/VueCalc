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
    props: ["currentInput"],
    template: `
    <div class="container">
        <div class="calculator">
            <div class="output">
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
                        keyType: 'btn btn-mod d-none',
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

        generateKeys() {
            keys[2].forEach(element => {
                console.log(element);
            });
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
            if (!isNaN(value)) this.currentInput = this.currentInput * 10 + value;
            else if (value == ',') {
                console.log('Entered')
                this.currentInput = parseFloat(this.currentInput);
            }
        }
    }

})
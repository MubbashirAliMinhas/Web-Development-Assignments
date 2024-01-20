const keys = document.querySelectorAll('.key')
const screen = document.querySelector('.screen')
let output = ''
let operatorState = false
let lastCharacter = ''
let infinityState = false

const operators = /^[-+/x.]$/
const numbers = /^[0-9]$/
const plusMinus = /^[-+]$/

const max_limit = 72

keys.forEach(key => {
    key.addEventListener('click', e => {
        if (key.value == '=') {
            lastCharacter = output[output.length - 1]
            if (lastCharacter.search(numbers) == -1) {
                output = screen.innerHTML.slice(0, screen.innerHTML.length - 1)
            }
            output = String(eval(output))
            if (output == 'undefined') {
                output = ''
            } else if (output.search(numbers) == 0) {
                operatorState = true
            } else if (output == 'Infinity') {
                infinityState = true
            }
        } else if (key.value.search(operators) == 0 && operatorState == true && output.length < max_limit && infinityState == false) {
            output += key.value == 'x' ? '*' : key.value
            operatorState = false
        } else if (key.value.search(plusMinus) == 0 && output == '') {
            output += key.value
        } else if (key.value.search(numbers) == 0 && output.length < max_limit && infinityState == false) {
            output += key.value
            operatorState = true
        } else if (key.value == 'C') {
            output = ''
            infinityState = false
            operatorState = false
        } else if (key.value == '<' && output != '') {
            if (infinityState == true) {
                output = ''
                infinityState = false
            } else {
                output = screen.innerHTML.slice(0, screen.innerHTML.length - 1)
            }
            if (output.length > 1) {
                lastCharacter = output[output.length - 1]
                if (lastCharacter.search(numbers) == 0) {
                    operatorState = true
                } else {
                    operatorState = false
                }
            } else {
                operatorState = false
            }
        }
        screen.innerHTML = output
    })
})
const userName = document.querySelector('#name')
const email = document.querySelector('#email')
const phoneNumber = document.querySelector('#phone-number')
const password = document.querySelector('#password')
const department = document.querySelector('#select-department')
const sessionMorning = document.querySelector('#morning')
const sessionEvening = document.querySelector('#evening')

const nameError = document.querySelector('#name-error')
const emailError = document.querySelector('#email-error')
const phoneNumberError = document.querySelector('#phone-number-error')
const passwordError = document.querySelector('#password-error')
const departmentError = document.querySelector('#department-error')
const sessionError = document.querySelector('#session-error')

const submitButton = document.querySelector('.submit-button')
const successText = document.querySelector('.success-text')

const errors = {
    userName: [nameError, false],
    email: [emailError, false],
    phoneNumber: [phoneNumberError, false],
    password: [passwordError, false],
    department: [departmentError, false],
    session: [sessionError, false]
}

const passwordCheck = {
    upperCase: /[A-Z]/,
    lowerCase: /[a-z]/,
    numbers: /[0-9]/,
    symbols: /[^A-Za-z0-9]/
}

let passwordMissingValues = []

const passwordErrorMessages = {
    oneType: () => `${passwordMissingValues[0]}.`,
    twoToFourTypes: () => {
        let message = ''
        for (let i = 0; i < passwordMissingValues.length - 1; i++) {
            message += `${passwordMissingValues[i]}, `
        }
        message += `and ${passwordMissingValues[passwordMissingValues.length - 1]}.`
        return message
    }
}

const emailRegex = /^[A-Za-z][A-Za-z0-9]*(.[A-Za-z0-9]+)*@[A-Za-z]+\.[A-Za-z]{2,5}(\.[A-Za-z]{2})?$/
const phoneNumberRegex = /^(\+92|0)3[0-4][0-9]{8}$/

submitButton.addEventListener('click', e => {
    defaultErrorState()

    if (!userName.value) {
        addError('userName', 'Please fill name')
    }
    if (!email.value) {
        addError('email', 'Please fill email.')
    } else if (!email.value.match(emailRegex)) {
        addError('email', 'Please enter valid email.')
    }
    if (!phoneNumber.value) {
        addError('phoneNumber', 'Please fill phone number.')
    } else if (!phoneNumber.value.match(phoneNumberRegex)) {
        addError('phoneNumber', 'Please enter valid phone number.')
    }
    if (!password.value) {
        addError('password', 'Please fill password')
    } else if (password.value.length < 8) {
        addError('password', 'Password length must contain at least 8 characters.')
    } else {
        if (!password.value.match(passwordCheck.lowerCase)) {
            passwordMissingValues.push('lowercase letter')
        }
        if (!password.value.match(passwordCheck.upperCase)) {
            passwordMissingValues.push('uppercase letter')
        }
        if (!password.value.match(passwordCheck.numbers)) {
            passwordMissingValues.push('number')
        }
        if (!password.value.match(passwordCheck.symbols)) {
            passwordMissingValues.push('symbol')
        }
        if (passwordMissingValues.length == 1) {
            addError('password', `Please enter atleast one ${passwordErrorMessages.oneType()}`)
        } else if (passwordMissingValues.length > 1) {
            addError('password', `Please enter atleast one ${passwordErrorMessages.twoToFourTypes()}`)
        }

    }
    if (department.options[department.selectedIndex].value == 'Select Department') {
        addError('department', 'Please select a department.')
    }
    if (!sessionMorning.checked && !sessionEvening.checked) {
        addError('session', 'Please select a session.')
    }

    showErrors()
    checkSuccess()
})

function defaultErrorState() {
    passwordMissingValues = []
    successText.style.visibility = 'hidden'
    for (const key in errors) {
        errors[key][1] = false
        errors[key][0].style.visibility = 'hidden'
    }
}

function showErrors() {
    for (const key in errors) {
        if (errors[key][1]) {
            errors[key][0].style.visibility = 'visible'
        }
    }
}

function addError(errorField, errorMessage) {
    errors[`${errorField}`][0].innerHTML = errorMessage
    errors[`${errorField}`][1] = true
}

function checkSuccess() {
    for (const key in errors) {
        if (errors[key][1] == true) {
            return
        }
    }
    successText.style.visibility = 'visible'
}
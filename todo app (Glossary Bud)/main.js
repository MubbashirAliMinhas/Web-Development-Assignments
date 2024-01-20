const addButton = document.querySelector('.insert-button')
const insertInput = document.querySelector('.insert-input')
const groceryList = document.querySelector('.grocery-list')
const clearButton = document.querySelector('.clear-button')

let i = 1

insertInput.addEventListener('keydown', e => {
    if (e.key == 'Enter') {
        addButton.click()
    }
})

addButton.addEventListener('click', e => {
    if (insertInput.value) {
        const groceryItem = document.createElement('div')
        const groceryInput = document.createElement('input')
        const doneButton = document.createElement('input')
        const editButton = document.createElement('input')
        const deleteButton = document.createElement('input')

        groceryItem.classList.add('grocery-item')
        groceryItem.id = `grocery-${i}`

        groceryInput.classList.add('grocery-input')
        groceryInput.type = 'text'
        groceryInput.value = insertInput.value
        groceryInput.disabled = true

        setButtonDefaults(doneButton, 'DONE', 'grocery-button', 'done-button')
        setButtonDefaults(editButton, 'EDIT', 'grocery-button', 'edit-button')
        setButtonDefaults(deleteButton, 'DELETE', 'grocery-button', 'delete-button')

        appendChildren(groceryItem, groceryInput, doneButton, editButton, deleteButton)
        groceryList.appendChild(groceryItem)

        deleteButton.addEventListener('click', e => {
            const groceryItemID = 'grocery-' + deleteButton.id.split('-')[2]
            document.getElementById(groceryItemID).remove()
        })
        
        let todoVal
        editButton.addEventListener('click', e => {
            if (editButton.value == 'EDIT') {
                editButton.value = 'CANCEL'
                doneButton.style.visibility = 'visible'
                groceryInput.disabled = false
                todoVal = groceryInput.value
            } else if (editButton.value == 'CANCEL') {
                editButton.value = 'EDIT'
                doneButton.style.visibility = 'hidden'
                groceryInput.disabled = true
                groceryInput.value = todoVal
            }
        })

        doneButton.addEventListener('click', e => {
            if (groceryInput.value) {
                editButton.value = 'EDIT'
                doneButton.style.visibility = 'hidden'
                groceryInput.disabled = true
            }
        })
    }
    insertInput.value = ''
    i++
})

clearButton.addEventListener('click', e => {
    groceryList.replaceChildren()
    i = 1
})

function setButtonDefaults(button, name, ...classList) {
    button.classList.add(...classList)
    button.type = 'button'
    button.value = name
    button.id = `delete-button-${i}`
}

function appendChildren(parent, ...elements) {
    for (const element of elements) {
        parent.appendChild(element)
    }
}
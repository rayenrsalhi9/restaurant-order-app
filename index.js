import { menuArray as menu } from "./data.js";

const menuList = document.getElementById('menu-list')
const orderList = document.getElementById('order-list')
const orderListContainer = document.getElementById('order-list-container')
const totalPrice = document.querySelector('.total-price-container .total-price')
const orderModalContainer = document.getElementById('order-modal-container')
const modalForm = document.getElementById('modal-form')
const confirmedOrderMsg = document.getElementById('confirmed-order-msg')

let orderArr = []

renderMenu()

document.addEventListener('click', e => {
    e.target.dataset.addedMenuId && addItemToOrder(parseInt(e.target.dataset.addedMenuId))
    e.target.dataset.removedMenuId && removeItemFromOrder(parseInt(e.target.dataset.removedMenuId))
    e.target.id === 'complete-order-btn' && showModal()
    e.target.id === 'close-modal-btn' && hideModal()
})

modalForm.addEventListener('submit', e => {
    e.preventDefault()

    const modalFormData = new FormData(modalForm)
    const name = modalFormData.get('name')
    
    modalForm.reset()
    hideModal()
    orderArr = []
    checkEmptyOrder()
    renderOrderConfirmationMessage(name)
})

// render functions
function renderMenu() {
    menuList.innerHTML = menu.map(el => `
            <div class="menu-list-item">
                <img src="${el.img.src}" alt="${el.img.alt}">
                <div class="menu-list-item-text">
                    <h2 class="name">${el.name}</h2>
                    <p class="ingredients">${el.ingredients.join(', ')}</p>
                    <p class="price">$${el.price}</p>
                </div>
                <button class="add-item-btn" data-added-menu-id=${el.id}>
                    +
                </button>
            </div>
        `).join('')
    checkEmptyOrder()
    confirmedOrderMsg.classList.add('hidden')
}

function renderOrder() {
    orderList.innerHTML = orderArr.map(el => `
            <div class="item">
                <h2 class="name">${el.name}</h2>
                <button class="remove-item-btn" data-removed-menu-id=${el.id}>remove</button>
                <div class="prices-container">
                    <p class="unity-price">$${el.price}</p>
                    <p class="quantity">x${el.quantity}</p>
                    <p class="price">$${el.price * el.quantity}</p>
                </div>
                
            </div>
        `).join('')
    renderTotal()
}

function renderTotal() {
    checkEmptyOrder()
    totalPrice.innerHTML = `$${
        orderArr.reduce((total, curr) => total + (curr.price * curr.quantity), 0)
    }`
}

// order utils
function checkEmptyOrder() {
    orderArr.length === 0 ?
    orderListContainer.classList.add('hidden') :
    orderListContainer.classList.remove('hidden')
}

function addItemToOrder(id) {
    const targetItem = menu.find(el => el.id === id)
    const targetItemInOrder = orderArr.find(el => el.id === targetItem.id)
    targetItemInOrder ?
    targetItemInOrder.quantity ++ :
    orderArr.unshift({...targetItem,quantity: 1})
    renderOrder()
} 

function removeItemFromOrder(id) {
    orderArr = orderArr.filter(el => el.id !== id)
    renderOrder()
}

// modal & order confirmation message
function showModal() {
    orderModalContainer.classList.remove('hidden')
}

function hideModal() {
    orderModalContainer.classList.add('hidden')
}

function renderOrderConfirmationMessage(name = 'User') {
    confirmedOrderMsg.textContent = `Thanks, ${name}! Your order is on its way!`
    confirmedOrderMsg.classList.remove('hidden')
    setTimeout(() => {
        confirmedOrderMsg.classList.add('hidden')
    }, 5000)
}
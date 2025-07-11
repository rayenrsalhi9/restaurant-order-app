import { menuArray as menu, menuArray } from "./data.js";

const menuList = document.getElementById('menu-list')
const orderList = document.getElementById('order-list')
const orderListContainer = document.getElementById('order-list-container')
const totalPrice = document.querySelector('.total-price-container .total-price')

let orderArr = []

renderMenu()

document.addEventListener('click', e => {
    e.target.dataset.addedMenuId && addItemToOrder(parseInt(e.target.dataset.addedMenuId))
})

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
}

function renderOrder() {
    orderList.innerHTML = orderArr.map(el => `
            <div class="item">
                <h2 class="name">${el.name}</h2>
                <button class="remove-item-btn">remove</button>
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

function checkEmptyOrder() {
    orderArr.length === 0 ?
    orderListContainer.classList.add('hidden') :
    orderListContainer.classList.remove('hidden')
}

function addItemToOrder(id) {
    const targetItem = menuArray.filter(el => el.id === id)[0]
    orderArr.filter(el => el.id === targetItem.id).length === 0 ?
    orderArr.unshift({
        ...targetItem,
        quantity: 1
    }) :
    orderArr.map(el => {
        el.id === targetItem.id ?
        el.quantity += 1 :
        el
    })
    renderOrder()
} 
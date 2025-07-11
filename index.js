import { menuArray as menu } from "./data.js";

const menuList = document.getElementById('menu-list')

renderMenu()

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
}
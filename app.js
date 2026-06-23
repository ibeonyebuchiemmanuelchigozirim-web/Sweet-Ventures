import { cart, addToCart, updateQuantity, removeFromCart } from '/cart.js'

const featuredProducts = [
    {
        image: 'pictures/IMG-20260617-WA0036.jpg',
        name: 'Male vintage shirts and trouser',
        price: 22000,
        id: 1,
        category: 'clothes'
    },

    {
        image: 'pictures/IMG-20260617-WA0037.jpg',
        name: 'Male vintage shirts and trouser',
        price: 22000,
        id: 2,
        category: 'clothes'
    },


    {
        image: 'pictures/IMG-20260617-WA0038.jpg',
        name: 'Male vintage shirts and trouser',
        price: 22000,
        id: 3,
        category: 'clothes'
    },

    {
        image: 'pictures/IMG-20260617-WA0039.jpg',
        name: 'Male vintage shirts and trouser',
        price: 22000,
        id: 4,
        category: 'clothes'
    },

    {
        image: 'pictures/IMG-20260617-WA0041.jpg',
        name: 'Male vintage shirts and trouser',
        price: 22000,
        id: 5,
        category: 'clothes'
    },

    {
        image: 'pictures/IMG-20260617-WA0042.jpg',
        name: 'vintage crop shirts for ladies',
        price: 8000,
        id: 6,
        category: 'clothes'
    }
]

const allProducts = [
    {
        image: 'pictures/IMG-20260617-WA0043.jpg',
        name: 'vintage crop shirts for ladies',
        price: 8000,
        id: 7,
        category: 'clothes'
    },

    {
        image: 'pictures/IMG-20260617-WA0058.jpg',
        name: 'Male vintage shirts',
        price: 9500,
        id: 8,
        category: 'clothes'
    },

    {
        image: 'pictures/IMG-20260617-WA0059.jpg',
        name: 'Vintage shirts',
        price: 9500,
        id: 9,
        category: 'clothes'
    },

    {
        image: 'pictures/IMG-20260617-WA0060.jpg',
        name: 'Vintage shirts',
        price: 9500,
        id: 10,
        category: 'clothes'
    },

    {
        image: 'pictures/IMG-20260617-WA0061.jpg',
        name: 'Male vintage shirts',
        price: 9500,
        id: 11,
        category: 'clothes'
    },

    {
        image: 'pictures/IMG-20260619-WA0042.jpg',
        name: 'Male vintage shirts',
        price: 9500,
        id: 12,
        category: 'clothes'
    },

        {
        image: 'pictures/IMG-20260617-WA0036.jpg',
        name: 'Male vintage shirts and trouser',
        price: 22000,
        id: 13,
        category: 'clothes'
    },

    {
        image: 'pictures/IMG-20260617-WA0037.jpg',
        name: 'Male vintage shirts and trouser',
        price: 22000,
        id: 14,
        category: 'clothes'
    },


    {
        image: 'pictures/IMG-20260617-WA0038.jpg',
        name: 'Male vintage shirts and trouser',
        price: 22000,
        id: 15,
        category: 'clothes'
    },

    {
        image: 'pictures/IMG-20260617-WA0039.jpg',
        name: 'Male vintage shirts and trouser',
        price: 22000,
        id: 16,
        category: 'clothes'
    },

    {
        image: 'pictures/IMG-20260617-WA0041.jpg',
        name: 'Male vintage shirts and trouser',
        price: 22000,
        id: 17,
        category: 'clothes'
    },

    {
        image: 'pictures/IMG-20260617-WA0042.jpg',
        name: 'vintage crop shirts for ladies',
        price: 8000,
        id: 18,
        category: 'clothes'
    }
]

const allproductsDatabase = [...featuredProducts, ...allProducts]

const isHomePage = document.querySelector('.hero') !== null
const products = isHomePage ? featuredProducts : allProducts

let productsHTML = ''

products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
            <img src="${product.image}" alt="" class="product-image">
        </div>

        <div class="product-name">${product.name}</div>
        <div class="price">₦${product.price}</div>
        <div class="added-msg"></div>
        <button class="cart-btn js-add-to-cart" 
        data-product-id="${product.id}">Add to cart</button>
     </div>
    `
})

document.querySelector('.js-products-grid').innerHTML = productsHTML


function updateCartQuantity() {
    const currentCart =
        JSON.parse(localStorage.getItem('cart')) || [];

    const cartQuantity = currentCart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.querySelector('.js-cart-quantity').textContent =
        cartQuantity;
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = Number(button.dataset.productId)
        addToCart(productId)
        updateCartQuantity()
        renderCart()

        const msg = document.querySelector(`[data-product-id="${productId}"]`)
        if (msg) {
            const addedMsg = button.closest('.product-container').querySelector('.added-msg')
            if (addedMsg) {
                addedMsg.innerHTML = 'Added <i class="fas fa-check-circle"></i>'

                setTimeout(() => {
                    addedMsg.innerHTML = ''
                }, 1500)
            }
        }
    })
})

function calculateCartTotal() {
    let cartTotal = 0

    cart.forEach((cartItem) => {
        const matchingProduct = allproductsDatabase.find(product => product.id === cartItem.productId)

        if (matchingProduct) {
            cartTotal += matchingProduct.price * cartItem.quantity
        }


    })
    return cartTotal

}


function renderProductsByFilter(filter = 'all') {


    let currentFilter = 'all'
    const categoryFilter = document.getElementById('categorySelect')
    let filteredProducts = products

    if (filter === 'all') {
        filteredProducts = products
    } else {
        filteredProducts = products.filter(product => product.category === filter)
    }

    let productsHTML = ''

    filteredProducts.forEach((product) => {
        productsHTML += `
            <div class="product-container">
        <div class="product-image-container">
            <img src="${product.image}" alt="" class="product-image">
        </div>

        <div class="product-name">${product.name}</div>
        <div class="price">₦${product.price}</div>
        <div class="added-msg"></div>
        <button class="cart-btn js-add-to-cart" 
        data-product-id="${product.id}">Add to cart</button>
     </div>

        `
    })

    document.querySelector('.js-products-grid').innerHTML = productsHTML

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = Number(button.dataset.productId)
            addToCart(productId)
            updateCartQuantity()
            renderCart()

            const addedMsg = button.closest('.product-container').querySelector('.added-msg')

            if (addedMsg) {
                addedMsg.innerHTML = 'Added <i class="fas fa-check-circle"></i>'
                setTimeout(() => {
                    addedMsg.innerHTML = ''
                }, 1500)
            }
        })
    })
}

const categoryFilter = document.getElementById('categorySelect')

if (categoryFilter) {
    renderProductsByFilter('all')

    categoryFilter.addEventListener('change', (e) => {
        renderProductsByFilter(e.target.value)
    })
}

function renderCart() {

    let cartItemsHTML = ''

    if (cart.length === 0) {
        cartItemsHTML += `
    
     <div class="empty-cart">
                <p>Your cart is empty 🛒</p>
                <p>Add some items to get started</p>
     </div>
    `

    } else {

        const cartTotal = calculateCartTotal()

        cart.forEach((cartItem) => {
            const matchingProduct = allproductsDatabase.find(product => product.id === cartItem.productId)

            if (matchingProduct) {
                const itemTotal = matchingProduct.price * cartItem.quantity

                cartItemsHTML += `
              <div id="cartItemsList" class="cart-item-list" data-product-id = ${cartItem.productId}>
            <div class="cart-item-name">${matchingProduct.name}</div>
            <div class="cart-item-img">
                <img src="${matchingProduct.image}" alt="" width="100px">
            </div>
            <div class="cart-item-quantity">
                Qty:
                <input type="number" class= "quantity-input" value="${cartItem.quantity}" min="1"> × ${matchingProduct.price}
            </div>
            <div class="cart-item-total">
                ₦${itemTotal}
            </div>
            <button class="remove-cart-item">
                Remove
            </button>
          </div>
     `
            }
        })
    }

    document.querySelector('.js-modal-body').innerHTML = cartItemsHTML

    const cartTotal = calculateCartTotal()
    document.querySelector('.js-total-cost').textContent = `₦${cartTotal}`

    document.querySelectorAll('.quantity-input').forEach((input) => {
        input.addEventListener('change', () => {
            const productId = Number(input.closest('.cart-item-list').dataset.productId)

            const newQuantity = Number(input.value)

            if (newQuantity > 0) {
                updateQuantity(productId, newQuantity)
                updateCartQuantity()
                renderCart()
            } else {
                input.value = 1
            }
        })
    })

    document.querySelectorAll('.remove-cart-item').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = Number(button.closest('.cart-item-list').dataset.productId)

            removeFromCart(productId)
            updateCartQuantity()
            renderCart()
        })
    })

}

renderCart()
updateCartQuantity()

document.querySelector('.whatsapp-order').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty! Add some items before placing your order')
        return
    }

    let message = "Hello Sweet Ventures, I want to order:\n"

    cart.forEach((cartItem) => {
        const matchingProduct = allproductsDatabase.find(p => p.id === cartItem.productId)

        if (matchingProduct) {
            const itemTotal = matchingProduct.price * cartItem.quantity
            message += `\n- ${matchingProduct.name}: ₦${matchingProduct.price.toLocaleString()} × ${cartItem.quantity} = ₦${itemTotal.toLocaleString()}`
        }
    })

    const total = calculateCartTotal()
    message += `\n\nTotal: ₦${total.toLocaleString()}`

    const whatsappNumber = "+2347036272100"

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappLink, '_blank')
})

const continueShopping = document.querySelector('.continue-shopping')

continueShopping.addEventListener("click", () => {
    modal.classList.remove('active')
    window.location.href = "product.html"
})



const openBtns = document.querySelector(".cart-icon")
const closeBtn = document.getElementById("closeModal")
const modal = document.getElementById("modal")

openBtns.addEventListener("click", () => {
    modal.classList.add("active")
})


closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
})

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

const menuToggle = document.getElementById("hamburger-icon")
const navContainer = document.querySelector(".nav-items")

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open")
    navContainer.classList.toggle("active")
})



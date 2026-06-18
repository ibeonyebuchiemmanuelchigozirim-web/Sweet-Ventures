function loadCart() {
    try {
        const savedCart = localStorage.getItem('cart')

        if (!savedCart) {
            return []
        }

        const parsedCart = JSON.parse(savedCart)

        if (!Array.isArray(parsedCart)) {
            localStorage.removeItem('cart')
            return []
        }

        return parsedCart
    } catch (error) {
        console.error ('cart data corrupted:', error)
        localStorage.removeItem('cart')
        return []
    }

}

export let cart = loadCart()

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId) {
    const matchingItem = cart.find(
        item => item.productId === productId
    )

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId,
            quantity: 1
        })
    }

    saveCart()
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem = ''

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem
        }
    })

    if (matchingItem) {
        matchingItem.quantity = newQuantity
    }

    saveCart()
}

export function removeFromCart(productId) {
    let itemIndex = -1

    cart.forEach((cartItem, index) => {
        if (productId === cartItem.productId) {
            itemIndex = index
        }
    })

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1)
    }

    saveCart()
}
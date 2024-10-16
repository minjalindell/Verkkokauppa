
const cartItemsElement = document.getElementById('cart-items'); 
const totalPriceElement = document.getElementById('total-price');
const cartCountElement = document.getElementById('cart-count');
const totalItemsCountElement = document.getElementById('total-items-count'); 


let cart = JSON.parse(localStorage.getItem('cart')) || [];
let clearCartTimeout; 


function displayCartItems() {
    
    cartItemsElement.innerHTML = `
        <tr>
            <th>Tuote</th>
            <th>Hinta</th>
            <th>Määrä</th>
            <th>Yhteensä</th>
            <th>Lisää/Poista</th>
        </tr>
    `;
    let totalPrice = 0;

    
    cart.forEach(product => {
        const totalProductPrice = parseFloat(product.price.replace('€', '')) * product.quantity;
        
        
        const listItem = document.createElement('tr');
        listItem.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>${totalProductPrice.toFixed(2)}€</td>
        `;

        
        const actionCell = document.createElement('td');
        
        
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.onclick = function() {
            addToCart(product.id);  
        };

        
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.onclick = function() {
            removeFromCart(product.id);  
        };

        
        actionCell.appendChild(addButton);
        actionCell.appendChild(removeButton);

        
        listItem.appendChild(actionCell);

        
        cartItemsElement.appendChild(listItem);
        
        
        totalPrice += totalProductPrice;
    });

    
    totalPriceElement.textContent = `Yhteensä: ${totalPrice.toFixed(2)}€`;

    
    const totalCount = cart.reduce((total, product) => total + product.quantity, 0);
    totalItemsCountElement.textContent = `Tuotteita: ${totalCount}`;
}


function updateCartCount() {
    const totalCount = cart.reduce((total, product) => total + product.quantity, 0);
    cartCountElement.textContent = totalCount; 
}


function startCartTimeout() {
    clearTimeout(clearCartTimeout); 
    clearCartTimeout = setTimeout(function() {
        alert('Ostoskorisi on tyhjennetty 1 minuutin käyttämättömyyden vuoksi.');
        clearCart(); 
    }, 60000); 
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productElement = this.closest('.product');
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.querySelector('h2').textContent;
        const productPrice = productElement.querySelector('p').textContent.replace('Hinta: ', '');

        
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            
            existingProduct.quantity += 1;
        } else {
            
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart)); 

        
        const notification = document.createElement('div');
        notification.style.background = 'lightgray';
        notification.style.padding = '10px';
        notification.style.marginTop = '10px';
        notification.style.position = 'fixed'; 
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '1000'; 
        notification.textContent = `${productName} on lisätty ostoskoriin!`; 
        document.body.appendChild(notification);

        
        setTimeout(() => {
            notification.remove(); 
        }, 3000);

        
        displayCartItems();
        updateCartCount(); 
        startCartTimeout(); 

        
        updateHeaderCartCount(); 
    });
});


function addToCart(productId) {
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1; 
    } else {
        console.error('Tuotetta ei löydy ostoskorista');
    }
    localStorage.setItem('cart', JSON.stringify(cart)); 
    displayCartItems(); 
    updateCartCount(); 
}


function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        cart[productIndex].quantity -= 1; 
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1); 
        }
        localStorage.setItem('cart', JSON.stringify(cart)); 
        displayCartItems(); 
        updateCartCount(); 
    } else {
        console.error('Tuotetta ei löydy ostoskorista');
    }
}


function clearCart() {
    cart = []; 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    displayCartItems(); 
    updateCartCount(); 
}


document.getElementById('clear-cart')?.addEventListener('click', function() {
    clearCart();
    clearTimeout(clearCartTimeout); 
});


document.getElementById('buy-button')?.addEventListener('click', function() {
    if (cart.length > 0) {
        alert('Kiitos tilauksestasi!'); 
        clearCart(); 
    } else {
        alert('Ostoskorisi on tyhjä! Lisää sinne tuotteita.');
    }
});


displayCartItems();
updateCartCount();

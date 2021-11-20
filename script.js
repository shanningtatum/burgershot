function openMenu(evt, menuName){
    var i, screen, menuTab;
    screen = document.getElementsByClassName("screen");

    for (i = 0; i < screen.length; i ++){
        screen[i].style.display= "none";
    }
    menuTab = document.getElementsByClassName("menuTab");
    for (i = 0; i < menuTab.length; i++) {
      menuTab[i].className = menuTab[i].className.replace(" active", "");
    }
    document.getElementById(menuName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("burgers").click();

const submitButton = document.querySelector('.submit');
const receiptList = document.querySelector('.receipt-list');
const summaryList = document.querySelector('.summary-price');
const itemSummaryList = document.querySelector('.item-cost');
const clearCartPopup = document.querySelector('.box');
const cashierName = document.querySelector ('#receipt-title');
const loginForm = document.querySelector('.login-container');
const menuDisplay = document.querySelector('#menu-content');
const errMessage = document.querySelector('#errorMessage');

const productsB = document.querySelector("#Burgers");
const productsD = document.querySelector("#Drinks");
const productsS = document.querySelector("#Sides");
const cartItemsSummary = document.querySelector(".receipt-list");

function renderProducts(){
    productsBurger.forEach((product) => {
        productsB.innerHTML += `
        <button class="button" id="${product.id}" type="button" onclick="newReceipt(${product.id})">${product.name}</button>
        `
    })
    productsDrinks.forEach((product)=>{
        productsD.innerHTML += `
        <button class="button" id="${product.id}" type="button" onclick="newReceipt(${product.id})">${product.name}</button>
        `
    })
    productsSides.forEach((product)=>{
        productsS.innerHTML += `
        <button class="button" id="${product.id}" type="button" onclick="newReceipt(${product.id})">${product.name}</button>
        `
    })
}

renderProducts();

let cart = [];
let drinkCart = [];

function newReceipt(id) {

    //check if product already exists in cart
    if(cart.some((item)=> item.id === id)){
        changeQty("plus",id);
    }
    else{
        const item = products.find ((product) => product.id === id);

        cart.push({
            ...item,
            numberOfUnits:1,
        });
        console.log(cart);
    }
    updateCart();
}

// update cart

function updateCart(){
    renderCartItems();
    renderSubtotal();
}

//calculate and render subtotal
function renderSubtotal (){
    let totalPrice = 0, totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems  += item.numberOfUnits;
    });

    summaryList.innerHTML = `Subtotal (${totalItems} items): $${totalPrice}`

}

// render cart items
function renderCartItems(){
    cartItemsSummary.innerHTML = ""; // clear cart element
    cart.forEach((item) => {
        cartItemsSummary.innerHTML += `
        <ul class="receiptPrint">
            <li class="receipt-item">${item.name}</li>
            <li><div class="minus-Btn" onclick="changeQty('minus',${item.id})"><i class="fas fa-minus"></i></div></li>
            <li><div class="item-quantity">${item.numberOfUnits}</div></li>
            <li><div class="add-Btn" onclick="changeQty('plus',${item.id})"><i class="fas fa-plus"></i></div></li>
            <li>$</li>
            <li class="item-cost">${item.price}</li>
            <li><div class="trash-Btn" onclick="removeItem(${item.id})"><i class="fas fa-trash"></i></div></li>
        </ul>
        `
    })
}

// change number of units for an item

function changeQty (action, id){
    cart = cart.map((item)=>{

        let numberOfUnits = item.numberOfUnits;

        if(item.id === id){

            if(action === "minus" && numberOfUnits > 1){
                numberOfUnits--;
            }
            else if (action === "plus"){
                numberOfUnits++;
            }
        }

        return {
            ...item,
            numberOfUnits,
        }
    })

    updateCart();
}

// clears the receipt lines when clear cart button is pressed
function clearCart(input){

    if (input == 'yes'){
        cartItemsSummary.innerHTML = "";
        clearCartPopup.style.display="none";
        cart.forEach(() => {
            cartItemsSummary.innerHTML += ``
            cart = [];
            renderSubtotal();
    })
    } else {
        clearCartPopup.style.display="none";
    }
}

// opens the modal that asks if they want to clear the cart
function mainMenu(){
    clearCartPopup.style.display="block";
}

function removeItem (id){
    cart = cart.filter( (item) => item.id !== id);

    updateCart();
}


// checks password 

function validation (){
    var usernameInput = document.getElementById('username').value;
    var passwordInput = document.getElementById('password').value;

    errMessage.innerHTML += ``;
    for ( i = 0; i < accounts.length; i++){
        if (usernameInput == accounts[i].username && passwordInput == accounts[i].password){

            var name = accounts[i].FirstName;
            
            cashierName.innerHTML += `<h5 class="cashier"> Cashier: ${name}</h5>`
            errMessage.innerHTML += ``;
            loginForm.style.display = "none";
            menuDisplay.style.display = "flex";
            return;
        }
        else{
            errMessage.style.display = "block";
        }

    }
}


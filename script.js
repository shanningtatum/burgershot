const submitButton = document.querySelector('.submit');
const receiptList = document.querySelector('.receipt-list');
const summaryList = document.querySelector('.summary-price');
const itemSummaryList = document.querySelector('.item-cost');
const clearCartPopup = document.querySelector('.box');
const cashierName = document.querySelector ('.cashier-info');
const dateTime = document.querySelector ('.dateInfo');
const loginForm = document.querySelector('.login-container');
const menuDisplay = document.querySelector('#menu-content');
const errMessage = document.querySelector('#errorMessage');
const logoutBtn = document.querySelector(".logout-container");

const productsB = document.querySelector("#Burgers");
const productsD = document.querySelector("#Drinks");
const productsS = document.querySelector("#Sides");
const cartItemsSummary = document.querySelector(".receipt-list");


/* setting date variables */
let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let day = date.getDate();
let currentDate = `${month}/${day}/${year}`;

/* setting time variables */

let hour = addZero(date.getHours());
let minutes = addZero(date.getMinutes());
let seconds = addZero(date.getSeconds());
let currentTime = `${hour}:${minutes}:${seconds}`;

// allows the date and time to print in double digits
function addZero(num){
    return num < 10 ? `0${num}`:num;
}


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

// this will create the buttons for each menu tab
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

// clears the receipt lines when clear cart button is pressed and updates the time and date
function clearCart(input){

    if (input == 'yes'){
        cartItemsSummary.innerHTML = "";

        updateDate();

        clearCartPopup.style.display="none";
        dateTime.innerHTML = "";
        dateTime.innerHTML += `
        <h5 id="date">Date: ${currentDate}</h5>
        <h5 id="time">Time: ${currentTime}</h5>`;

        cart.forEach(() => {
    
            cartItemsSummary.innerHTML += ``
            cart = [];
            renderSubtotal();
    })
    } else {
        clearCartPopup.style.display="none";
    }
}

function updateDate () {
    date = new Date();
        
    month = date.getMonth() + 1;
    year = date.getFullYear();
    day = date.getDate();
    currentDate = `${month}/${day}/${year}`;
    
    /* setting time variables */
    
    hour = addZero(date.getHours());
    minutes = addZero(date.getMinutes());
    seconds = addZero(date.getSeconds());
    currentTime = `${hour}:${minutes}:${seconds}`;
}

// opens the modal that asks if they want to clear the cart
function mainMenu(){
    clearCartPopup.style.display="block";
}

function removeItem (id){
    cart = cart.filter( (item) => item.id !== id);

    updateCart();
}


// checks password and will print cashier name, current date, and time

function validation (){
    var usernameInput = document.getElementById('username').value;
    var passwordInput = document.getElementById('password').value;

    errMessage.innerHTML += ``;
    for ( i = 0; i < accounts.length; i++){
        if (usernameInput == accounts[i].username && passwordInput == accounts[i].password){

            updateDate();
            var name = accounts[i].FirstName;
            logoutBtn.style.display = "flex";
            cashierName.innerHTML += `<h5 class="cashier"> Cashier: ${name}</h5>`
            dateTime.innerHTML += `<h5 id="date">Date: ${currentDate}</h5>
            <h5 id="time">Time: ${currentTime}</h5>`;
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

function logout (){

    clearFields();

    cashierName.innerHTML = "";
    dateTime.innerHTML = "";
    menuDisplay.style.display = "none";
    loginForm.style.display = "flex";
    logoutBtn.style.display = "none";
}

function clearFields (){
    var usernameInput = document.getElementById('username').value;
    var passwordInput = document.getElementById('password').value;

    usernameInput.value = "";
    passwordInput.value = "";
}

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
const discountMessage = document.querySelector("#discountMessage");
const logoutBtn = document.querySelector(".logout-container");
const logo = document.querySelector(".logo");
const createTab = document.querySelector("#screenOne");
const discountModal = document.querySelector(".discount-box");
const discountCalc = document.querySelector('.discount-price');
const grandList = document.querySelector('.grand-price');


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

// creates array for menu items
let cart = [];
var grandTotal = [];

// allows the date and time to print in double digits
function addZero(num){
    return num < 10 ? `0${num}`:num;
}

// menu tab functions
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

// this will create the buttons for each service
function renderServices(){
    
    services.forEach((service) => {
        productsB.innerHTML += `
        <button class="button" id="${service.id}" type="button" onclick="newService(${service.id})">${service.name}</button>`
    })
}


// adds the item to the receipt when you click for burgershot
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

// adds the item to the receipt when you click for mechanic
function newService(id){

    if(cart.some((item)=> item.id === id)){
        changeQty("plus",id);
    }
    else{
        const item = services.find ((services) => services.id === id);

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

function updateDiscount(){

}

//calculate and render subtotal
function renderSubtotal (){
    let totalPrice = 0, totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems  += item.numberOfUnits;
    });

    summaryList.innerHTML = `Subtotal (${totalItems} items): $${totalPrice}`;

    grandTotal[0]= totalPrice;

    grandList.innerHTML = `Grand Total: $${grandTotal[0]}`
    console.log(grandTotal[0]);

    applyDiscount();
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
        grandTotal = [];
        discountCalc.innerHTML = `Discount (%): $0`;

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
function clearCartBtn(){
    clearCartPopup.style.display="block";
}

//opens the modal for discounts
function discountBtn(){
    discountModal.style.display="block";
}

function applyDiscount(){
    var discountAmt = document.getElementById('discount-input').value;
    grandTotal[1] = discountAmt;

    console.log(discountAmt);
    if (discountAmt < 0){
        discountMessage.style.display="block";
    }
    else{
        var discountAdj = discountAmt / 100;
        var discCalc = (grandTotal[0] * discountAdj);

        grandTotal[2] = (grandTotal[0] - discCalc);
        discountCalc.innerHTML = `Discount (${grandTotal[1]}%): $${discCalc}`;
        grandList.innerHTML = `Grand Total: $${grandTotal[2]}`
        discountModal.style.display="none";
    }
}

function closeBtn(){
    discountModal.style.display="none";
}

// delete button
function removeItem (id){
    cart = cart.filter( (item) => item.id !== id);

    updateCart();
}


// checks password and will print cashier name, current date, and time

function validation (){
    var usernameInput = document.getElementById('username').value;
    var passwordInput = document.getElementById('password').value;

    errMessage.innerHTML = "";
    for ( i = 0; i < accounts.length; i++){

        if (usernameInput == accounts[i].username && passwordInput == accounts[i].password){

            var name = accounts[i].FirstName;
            var job = accounts[i].job;
            
            updateDate();

            if (job == "mechanic"){
                
                // pulls up the tabbed menu
                createTab.innerHTML += `<h4>Products</h4><div class="tab">
                <button class="menuTab" id="burgers" type="button" onclick="openMenu(event, 'Burgers')">Services</button>
                </div>`

                document.getElementById("burgers").click();

                // gets rid of the login form and displays the menu box and the log out button
                loginForm.style.display = "none";
                menuDisplay.style.display = "flex";
                logoutBtn.style.display = "flex";
                var logoImg = logos[1].imgSrc;

                logo.innerHTML += `<img id="lostLogo" src="${logoImg}">`

                cashierName.innerHTML += `<h5 class="cashier"> Employee: ${name}</h5>`
                dateTime.innerHTML += `<h5 id="date">Date: ${currentDate}</h5>
                <h5 id="time">Time: ${currentTime}</h5>`;
                renderServices();
            }
            else if (job == "burgershot"){

                createTab.innerHTML += `<h4>Menu</h4><div class="tab">
                <button class="menuTab" id="burgers" type="button" onclick="openMenu(event, 'Burgers')">Burgers</button>
                <button class="menuTab" id="drinks" type="button" onclick="openMenu(event, 'Drinks')">Drinks</button>
                <button class="menuTab" id="sides" type="button" onclick="openMenu(event, 'Sides')">Sides</button>
                </div>`

                document.getElementById("burgers").click();

                loginForm.style.display = "none";
                menuDisplay.style.display = "flex";
                logoutBtn.style.display = "flex";
                var logoImg = logos[0].imgSrc;

                logo.innerHTML += `<img src="${logoImg}">`

                cashierName.innerHTML += `<h5 class="cashier"> Cashier: ${name}</h5>`
                dateTime.innerHTML += `<h5 id="date">Date: ${currentDate}</h5>
                <h5 id="time">Time: ${currentTime}</h5>`;

                renderProducts();
            }
        }
        else {
            errMessage.style.display = "block";
        }
    }
}


function logout (){

    var usernameInput = document.getElementById('username').value;
    var passwordInput = document.getElementById('password').value;

    cart = [];
    grandTotal = [];
    cartItemsSummary.innerHTML = "";
    summaryList.innerHTML = `Subtotal (0 items): $0`;
    discountCalc.innerHTML = `Discount (%): $0`;
    grandList.innerHTML = `Grand Total: $0`
    createTab.innerHTML = "";
    logo.innerHTML = "";
    productsB.innerHTML = "";
    productsD.innerHTML = "";
    productsS.innerHTML = "";

    usernameInput.value = "";
    passwordInput.value = "";

    cashierName.innerHTML = "";
    dateTime.innerHTML = "";
    menuDisplay.style.display = "none";
    loginForm.style.display = "flex";
    logoutBtn.style.display = "none";

}



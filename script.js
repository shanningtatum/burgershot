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

function alertMenu(item){

    if (item == 'Burgers'){
        alert("Burger has been pressed");
    }
    else if (item == 'Drinks'){
        alert("Drinks has been pressed");
    }
    else if (item == 'Sides'){
        alert("Sides has been pressed");
    }
    else if (item == 'Bleeder'){
        alert("Bleeder Burger");
    }
    else if(item == 'Moneyshot'){
        combo(item);
        alert("Moneyshot Burger");
    }
    else if(item == 'Torpedo'){
        combo(item);
        alert("Torpedo Burger");
    }
    else if(item == 'Meatfree'){
        combo(item);
        alert("Meatfree Burger");
    }
    else if(item == 'Water'){
        alert("Water");
    }
    else if(item == 'Monster'){
        alert("Monster");
    }
    else if(item == 'Soda'){
        alert("Soda");
    }
    else if(item == 'Milkshake'){
        alert("Milkshake");
    }
    else if(item == 'Combo'){
        alert("Combo");
    }
    else if(item == 'Fries'){
        alert("Fries");
    }
    else if(item == 'Onion Rings'){
        alert("Onion Rings");
    }
}

const submitButton = document.querySelector('.submit');
const receiptList = document.querySelector('.receipt-list');
const summaryList = document.querySelector('.summary');
const receiptTotal = document.createElement('h4');
const quantityCheck = document.querySelector('.item-quantity');



receiptList.addEventListener('click', deleteCheck);
receiptList.addEventListener('click', qtyCheck);

let itemClick = 1;
var printCount = 0;
var summaryPrice = 0;
var qtyCount = 1;
const line = 10;

receiptTotal.innerHTML = ("$" + summaryPrice);
receiptTotal.classList.add("summary-price");
summaryList.appendChild(receiptTotal);

function newReceipt(item){
    console.log('WTF');

    if (printCount <= line){
    // receipt Div
    const receiptLine = document.createElement("tr");
    receiptLine.classList.add("receiptPrint");

    // Create thread
    const receiptPrint = document.createElement('td');
    receiptPrint.innerText = item;
    receiptPrint.classList.add('receipt-item');
    receiptLine.appendChild(receiptPrint);

    // Subtract quantity button
    const minusBtn = document.createElement('button');
    minusBtn.innerHTML = '<i class="fas fa-minus"></i>';
    minusBtn.classList.add("minus-Btn");
    receiptLine.appendChild(minusBtn);

    // creates item quantity input
    const itemQty = document.createElement ('input');
    itemQty.value = qtyCount;
    itemQty.classList.add('item-quantity');
    itemQty.setAttribute("id","itemQuantity");
    receiptLine.appendChild(itemQty);

    // Add quantity button
    const plusBtn = document.createElement('button');
    plusBtn.innerHTML = '<i class="fas fa-plus"></i>';
    plusBtn.classList.add("add-Btn");
    receiptLine.appendChild(plusBtn);

    // Print item Price
        if (item == 'Bleeder' || item == 'Torpedo'|| item == 'Meatfree'){
            var itemPrice = 100;

            const dollarSign = document.createElement('td');
            dollarSign.innerText = "$";
            receiptLine.appendChild(dollarSign);

            const itemCost = document.createElement('td');
            itemCost.innerText = (itemPrice*qtyCount);
            itemCost.classList.add('item-cost');
            itemCost.setAttribute("id","itemCost");
            receiptLine.appendChild(itemCost);

            summaryPrice = summaryPrice + itemPrice;
        }
        else if(item == 'Moneyshot' || item == 'Milkshake'){
            var itemPrice = 200;

            const dollarSign = document.createElement('td');
            dollarSign.innerText = "$";
            receiptLine.appendChild(dollarSign);

            const itemCost = document.createElement('td');
            itemCost.innerText = (itemPrice*qtyCount);
            itemCost.classList.add('item-cost');
            receiptLine.appendChild(itemCost);

            summaryPrice = summaryPrice + itemPrice;
        }
        else if(item == 'Fries' || item == 'Onion Rings'){
            var itemPrice = 40;

            const dollarSign = document.createElement('td');
            dollarSign.innerText = "$";
            receiptLine.appendChild(dollarSign);

            const itemCost = document.createElement('td');
            itemCost.innerText = (itemPrice*qtyCount);
            itemCost.classList.add('item-cost');
            itemCost.setAttribute('id','itemCost');
            receiptLine.appendChild(itemCost);

            summaryPrice = summaryPrice + itemPrice;
        }
        else if(item == 'Water' || item == 'Soda'|| item == 'Monster'){
            var itemPrice = 10;

            const dollarSign = document.createElement('td');
            dollarSign.innerText = "$";
            receiptLine.appendChild(dollarSign);

            const itemCost = document.createElement('td');
            itemCost.innerText = (itemPrice*qtyCount);
            itemCost.classList.add('item-cost');
            receiptLine.appendChild(itemCost);

            summaryPrice = summaryPrice + itemPrice;
        }
    
    // Delete item
    const trashBtn = document.createElement ('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add("trash-Btn");
    receiptLine.appendChild(trashBtn);

    // Summary total
    receiptTotal.innerHTML = ("$" + summaryPrice);
    receiptTotal.classList.add("summary-price");
    summaryList.appendChild(receiptTotal);

    // Append to List
    receiptList.appendChild(receiptLine);

    console.log(qtyCount);
    printCount = printCount + 1;

    }
    else {
        alert("max limit");
    }
}

function priceUpdate(){

    console.log("price update");
    alert(qtyCount);
}

function mainMenu(){
    const menuButton = document.querySelector('#screenOne');
    const burgerMenu = document.querySelector('#screenTwo');
    const drinkMenu = document.querySelector('#screenThree');
    const sideMenu = document.querySelector('#screenFour');
    const comboMenu = document.querySelector('#combo');

    alert('Returning to main menu');
    menuButton.style.display = 'block';
    burgerMenu.style.display = 'none';
    drinkMenu.style.display = 'none';
    sideMenu.style.display = 'none';
    comboMenu.style.display = 'none';
}

function backBtn(){
    console.log('clicked');
}

function deleteCheck(e){
    const deleteItem =  e.target;

    if(deleteItem.classList[0]==="trash-Btn"){
        const delItem = deleteItem.parentElement;
        const subCost = delItem.children[5].innerText;

        delItem.remove();

        summaryPrice = summaryPrice - subCost;
        receiptTotal.innerHTML = ("$" + (summaryPrice));
        receiptTotal.classList.add("summary-price");
        summaryList.appendChild(receiptTotal);

        printCount = printCount - 1;
    }
    console.log(e.target);
}

function qtyCheck(e){
    const addQty = e.target;
    var valueCount;
    var incrementButton = document.getElementsByClassName("add-Btn");
    var decrementButton = document.getElementsByClassName("minus-Btn");


    for(var i = 0; i< incrementButton.length; i++){
        var button = incrementButton[i];

        button.addEventListener('click', function(e){
            
            var buttonClicked = e.target;

            var input = buttonClicked.parentElement.children[2];
            var inputValue = input.value;
            var newValue = parseInt(inputValue) + 1;
            input.value = newValue;

        })
    }

}
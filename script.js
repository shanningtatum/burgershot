const app = {};

app.$submitBtn = $(".submit");
app.$receiptList = $(".receipt-list");
app.$summaryList = $(".summary-price");
app.$clearCart = $(".clearCartBox");
app.$cashierInfo = $(".cashier-info");
app.$dateInfo = $(".dateInfo");
app.$loginContainer = $(".login-container");
app.$menuContent = $("#menu-content");
app.$errorMessage = $("#errorMessage");
app.$discountMessage = $("#discountMessage");
app.$logoutBtn = $("#logoutBtn");
app.$logoutContainer = $(".logout-container");
app.$menuTabs = $("#menuTabs");
app.$menuTab = $(".menuTab");
app.$discountBox = $(".discount-box");
const logo = document.querySelector(".logo");

app.$cartInput = $(".cart-input");
app.$discountPrice = $(".discount-price");
app.$grandPrice = $(".grand-price");

app.$firstScreenTab = $("#firstScreen");
app.$secondScreenTab = $("#secondScreen");
app.$thirdScreenTab = $("#thirdScreen");

app.$clearCartBtn = $(".clear-cart");
app.$discountBtn = $(".discount");

app.$discountSubmit = $(".discountSubmit");
app.$discountCancel = $(".discountCancel");

const usernameInput = $("#username");
const passwordInput = $("#password");

// /* setting date variables */
// let date = new Date();
// let month = date.getMonth() + 1;
// let year = date.getFullYear();
// let day = date.getDate();
// let currentDate = `${month}/${day}/${year}`;

// /* setting time variables */

// let hour = addZero(date.getHours());
// let minutes = addZero(date.getMinutes());
// let seconds = addZero(date.getSeconds());
// let currentTime = `${hour}:${minutes}:${seconds}`;

// creates array for menu items
let cart = [];
let grandTotal = [];

// allows the date and time to print in double digits
function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

app.eventListeners = () => {
  app.$submitBtn.on("click", function () {
    app.validation();
  });

  app.$logoutBtn.on("click", function () {
    app.logout();
  });

  app.$menuTab.on("click", function () {
    console.log("clicked");
  });
};

app.validation = () => {
  for (i = 0; i < accounts.length; i++) {
    if (
      usernameInput.val() == accounts[i].username &&
      passwordInput.val() == accounts[i].password
    ) {
      let name = accounts[i].FirstName;
      let job = accounts[i].job;

      app.updateDate();

      if (job == "mechanic") {
        app.$menuTabs
          .html(`<h4 class="receipt-title">Products</h4><div class="tab">
          <button class="menuTab" id="firstTab" type="button" onclick="openMenu(event, 'firstScreen')">Services</button>
          </div>`);
        document.getElementById("firstTab").click();
        var logoImg = logos[1].imgSrc;
        logo.style.display = "flex";
        logo.innerHTML += `<img class="logoImage" id="lostLogo" src="${logoImg}" draggable="false">`;
        app.renderServices();
      } else if (job == "burgershot") {
        app.$menuTabs.html(`<h4 class="receipt-title">Menu</h4><div class="tab">
          <button class="menuTab" id="firstTab" type="button" onclick="openMenu(event, 'firstScreen')">Burgers</button>
          <button class="menuTab" id="secondTab" type="button" onclick="openMenu(event, 'secondScreen')">Drinks</button>
          <button class="menuTab" id="thirdTab" type="button" onclick="openMenu(event, 'thirdScreen')">Sides</button>
          </div>`);

        document.getElementById("firstTab").click();
        var logoImg = logos[0].imgSrc;
        logo.style.display = "flex";
        logo.innerHTML += `<img class="logoImage" src="${logoImg}" id="BSLogo" draggable="false">`;

        app.renderProducts();
      } else if (job == "autoexotic") {
        app.$menuTabs
          .html(`<h4 class="receipt-title">Products</h4><div class="tab">
          <button class="menuTab" id="firstTab" type="button" onclick="openMenu(event, 'firstScreen')">Services</button>
          </div>`);
        document.getElementById("firstTab").click();
        var logoImg = logos[2].imgSrc;
        logo.style.display = "flex";
        logo.innerHTML += `<img class="logoImage" id="AELogo" src="${logoImg}" draggable="false">`;
        app.renderServices();
      } else if (job == "vunicorn") {
        app.$menuTabs.html(`<h4>Products</h4><div class="tab">
                  <button class="menuTab" id="firstTab" type="button" onclick="openMenu(event, 'firstScreen')">Drinks</button>
                  </div>`);

        document.getElementById("firstTab").click();

        // gets rid of the login form and displays the menu box and the log out button

        var logoImg = logos[3].imgSrc;

        logo.style.display = "flex";
        logo.innerHTML += `<img class="logoImage" id="VULogo" src="${logoImg}" draggable="false">`;
        app.renderDrinks();
      }

      app.openMenuCss();
      app.renderCashierDate(name);
    } else {
      app.$errorMessage.css({ display: "block" });
    }
  }
};

app.openMenuEventListeners = () => {
  app.$discountBtn.on("click", function () {
    app.discountBtn();
  });

  app.$clearCartBtn.on("click", function () {
    app.clearCartBtn();
  });
};

app.openMenuCss = () => {
  app.$loginContainer.css({ display: "none" });
  app.$menuContent.css({ display: "grid" });
  app.$logoutContainer.css({ display: "block" });
  app.openMenuEventListeners();
};

app.openMenu = (e, menuName) => {
  var i, screen, menuTab;
  screen = document.getElementsByClassName("screen");

  for (i = 0; i < screen.length; i++) {
    screen[i].style.display = "none";
  }
  menuTab = document.getElementsByClassName("menuTab");
  for (i = 0; i < menuTab.length; i++) {
    menuTab[i].className = menuTab[i].className.replace(" active", "");
  }
  document.getElementById(menuName).style.display = "block";
  e.currentTarget.className += " active";
};

// menu tab functions
function openMenu(evt, menuName) {
  var i, screen, menuTab;
  screen = document.getElementsByClassName("screen");

  for (i = 0; i < screen.length; i++) {
    screen[i].style.display = "none";
  }
  menuTab = document.getElementsByClassName("menuTab");
  for (i = 0; i < menuTab.length; i++) {
    menuTab[i].className = menuTab[i].className.replace(" active", "");
  }
  document.getElementById(menuName).style.display = "block";
  evt.currentTarget.className += " active";
}

// this will create the buttons for each menu tab
app.renderProducts = () => {
  productsBurger.forEach((product) => {
    app.$firstScreenTab
      .append(`<button class="button" id="${product.id}" type="button" onclick="newReceipt(${product.id})">${product.name}</button>
    `);
  });
  productsDrinks.forEach((product) => {
    app.$secondScreenTab
      .append(`<button class="button" id="${product.id}" type="button" onclick="newReceipt(${product.id})">${product.name}</button>
    `);
  });
  productsSides.forEach((product) => {
    app.$thirdScreenTab
      .append(`<button class="button" id="${product.id}" type="button" onclick="newReceipt(${product.id})">${product.name}</button>
        `);
  });
};

// this will create the buttons for each service
app.renderServices = () => {
  services.forEach((service) => {
    app.$firstScreenTab.append(
      `<button class="button" id="${service.id}" type="button" onclick="newService(${service.id})">${service.name}</button>`
    );
  });
};

//this will create the buttons for each drink
app.renderDrinks = () => {
  alcohol.forEach((alcoholic) => {
    app.$firstScreenTab.append(
      `<button class="button" id="${alcoholic.id}" type="button" onclick="newDrinks(${alcoholic.id})">${alcoholic.name}</button>`
    );
  });
};

// adds the item to the receipt when you click for burgershot
function newReceipt(id) {
  //check if product already exists in cart
  if (cart.some((item) => item.id === id)) {
    app.changeQty("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  app.updateCart();
}

// adds the item to the receipt when you click for mechanic
function newService(id) {
  if (cart.some((item) => item.id === id)) {
    app.changeQty("plus", id);
  } else {
    const item = services.find((services) => services.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  app.updateCart();
}

function newDrinks(id) {
  if (cart.some((item) => item.id === id)) {
    app.changeQty("plus", id);
  } else {
    const item = alcohol.find((alcohol) => alcohol.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  app.updateCart();
}

// update cart
app.updateCart = () => {
  app.renderCartItems();
  app.renderSubtotal();
};

//calculate and render subtotal
app.renderSubtotal = () => {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  grandTotal[0] = totalPrice;

  app.$summaryList.html(`Subtotal (${totalItems} items): $${totalPrice}`);
  app.$grandPrice.text(`Grand Total: $${grandTotal[0]}`);
  app.applyDiscount();
};

// render cart items
app.renderCartItems = () => {
  app.$receiptList.html(""); // clear cart element
  cart.forEach((item) => {
    app.$receiptList.append(`
    <ul class="receiptPrint">
      <div class="receipt-item">${item.name}</div>
      <div class="minus-Btn"><i class="fas fa-minus"></i></div>
      <div class="item-quantity">${item.numberOfUnits}</div>
      <div class="add-Btn"><i class="fas fa-plus"></i></div>
      <div class="dollar-sign">$</div>
      <div class="item-cost"> ${item.price}</div>
      <div class="trash-Btn"><i class="fas fa-trash"></i></div>
    </ul> 
    `);
  });

  app.$minusBtn = $(".minus-Btn");
  app.$addBtn = $(".add-Btn");
  app.$trashBtn = $(".trash-Btn");

  app.$minusBtn.on("click", function () {
    let buttonItem = $(this).siblings(".receipt-item").text();
    app.findItemId(buttonItem, "minus");
    // app.changeQty("minus", itemId);
  });

  app.$addBtn.on("click", function () {
    let buttonItem = $(this).siblings(".receipt-item").text();
    app.findItemId(buttonItem, "plus");
    // app.changeQty("plus", itemId);
  });

  app.$trashBtn.on("click", function () {
    let buttonItem = $(this).siblings(".receipt-item").text();
    app.findItemId(buttonItem, "delete");
  });
};

app.findItemId = (itemName, action) => {
  cart.forEach((item, index) => {
    if (itemName == item.name) {
      itemId = cart[index].id;

      if (action == "delete") {
        app.removeItem(itemId);
      } else {
        app.changeQty(action, itemId);
      }
    } else {
      console.log("not the same");
    }
    // console.log(item);
  });
  // console.log(itemName);
};

// change number of units for an item

app.changeQty = (action, id) => {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus") {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  app.updateCart();
};

// clears the receipt lines when clear cart button is pressed and updates the time and date
app.clearCart = (input) => {
  if (input == "Yes") {
    app.$receiptList.html("");

    app.updateDate();

    app.$clearCart.css({ display: "none" });

    app.$dateInfo.html("");
    app.$dateInfo.html(`
    <h5 id="date">${currentDate}</h5>
    &#160
    <h5 id="time">${currentTime}</h5>
    `);
    grandTotal = [];

    app.$discountPrice.text(`Discount (%): $0`);

    cart.forEach(() => {
      app.$receiptList.html("");
      cart = [];
      app.renderSubtotal();
    });
  } else {
    app.$clearCart.css({ display: "none" });
  }
};

app.updateDate = () => {
  date = new Date();
  console.log(date);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  month = date.getMonth() + 1;
  year = date.getFullYear();
  day = date.getDate();
  currentDate = `${monthNames[month]} ${day}, ${year}`;

  /* setting time variables */

  hour = addZero(date.getHours());
  minutes = addZero(date.getMinutes());
  seconds = addZero(date.getSeconds());
  currentTime = `${hour}:${minutes}:${seconds}`;
};

// opens the modal that asks if they want to clear the cart
app.clearCartBtn = () => {
  app.$clearCart.css({ display: "block" });

  app.$cartInput.on("click", function () {
    let userInput = $(this).text();
    app.clearCart(userInput);
  });
};

//opens the modal for discounts
app.discountBtn = () => {
  app.$discountBox.css({ display: "block" });

  app.$discountSubmit.on("click", function () {
    app.applyDiscount();
  });

  app.$discountCancel.on("click", function () {
    closeBtn();
  });
};

app.applyDiscount = () => {
  var discountAmt = document.getElementById("discount-input").value;
  grandTotal[1] = discountAmt;

  if (discountAmt < 0 || discountAmt > 100) {
    app.$discountMessage.css({ display: "block" });
  } else {
    app.$discountMessage.css({ display: "none" });
    var discountAdj = discountAmt / 100;
    var discCalc = grandTotal[0] * discountAdj;

    grandTotal[2] = grandTotal[0] - discCalc;
    app.$discountPrice.text(`Discount (${grandTotal[1]}%): $${discCalc}`);
    app.$grandPrice.text(`Grand Total: $${grandTotal[2]}`);
    app.$discountBox.css({ display: "none" });
  }
};

function closeBtn() {
  app.$discountBox.css({ display: "none" });
  app.$discountMessage.css({ display: "none" });
}

// delete button
app.removeItem = (id) => {
  cart = cart.filter((item) => item.id !== id);

  app.updateCart();
};

// checks password and will print cashier name, current date, and time
app.renderCashierDate = (name) => {
  app.$cashierInfo.html(`<h5 class="cashier"> Employee: ${name}</h5>`);
  app.$dateInfo
    .html(`<h5 id="date">${currentDate}</h5>&#160<h5 id="time">${currentTime}</h5>
  `);
};

app.logout = () => {
  cart = [];
  grandTotal = [];
  app.$receiptList.html("");
  app.$summaryList.text(`Subtotal (0 items): $0`);
  app.$discountPrice.text(`Discount (%): $0`);
  app.$grandPrice.text(`Grand Total: $0`);
  app.$menuTabs.html("");
  logo.innerHTML = "";
  app.$firstScreenTab.text("");
  app.$secondScreenTab.text("");
  app.$thirdScreenTab.text("");

  usernameInput.val("");
  passwordInput.val("");
  logo.style.display = "none";
  app.$cashierInfo.html("");
  app.$dateInfo.html("");
  app.$menuContent.css({ display: "none" });
  app.$loginContainer.css({ display: "grid" });
  app.$logoutContainer.css({ display: "none" });
  app.$errorMessage.css({ display: "none" });
};

app.init = () => {
  app.eventListeners();
  app.updateDate();
};

$(() => {
  app.init();
});

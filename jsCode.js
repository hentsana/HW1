const input = document.querySelector(".input-product");
const form = document.querySelector(".add-product");
const productList = document.querySelector("#product-list");
const noBought = document.querySelector("#no-bought");
const bought = document.querySelector("#bought");

const savedProduct = localStorage.getItem("products");
if (savedProduct) productList.innerHTML = savedProduct;

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const productName = input.value;
    if (productName === "")
        return;

    const productItem = document.createElement("span");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
        <span class="product-name">${productName}</span>
        <button class="minus-button" data-tooltip="Minus button" disabled>-</button>
        <span class="amount">1</span>
        <button class="plus-button" data-tooltip="Plus button">+</button>
        <button class="buy-button" data-tooltip="Buy button">
            Куплено
        </button>
        <button class="delete-button" data-tooltip="Delete button">
            x
        </button>
    `;

    productList.appendChild(productItem);
    saveProduct();
    input.value = "";
    input.focus();
    updateRightPart();
})

productList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-button")) {
        const productItem = event.target.closest(".product-item");
        productItem.remove();
        saveProduct();
        updateRightPart();
    }
})

productList.addEventListener("click", function(event) {
    if (event.target.classList.contains("buy-button")) {
        const productItem = event.target.closest(".product-item")
        productItem.classList.toggle("bought");

        const minusButton = productItem.querySelector(".minus-button");
        const plusButton = productItem.querySelector(".plus-button");
        const deleteButton = productItem.querySelector(".delete-button");

        minusButton.classList.toggle("hidden");
        plusButton.classList.toggle("hidden");
        deleteButton.classList.toggle("hidden");

        if (productItem.classList.contains("bought")) {
            event.target.textContent = "Не куплено";
            saveProduct();
            updateRightPart();
        } else {
            event.target.textContent = "Куплено";
            saveProduct();
            updateRightPart();
        }
    }
})

productList.addEventListener("click", function(event) {
    if (event.target.classList.contains("product-name")) {
        const productItem = event.target.closest(".product-item");
        const previousName = event.target.textContent;
        const input = document.createElement("input");

        input.type = "text";
        input.value = previousName;
        input.classList.add("input-product");

        event.target.replaceWith(input);
        input.focus();
        updateRightPart();
        input.addEventListener("blur", function() {
            const newName = document.createElement("span");
            newName.classList.add("product-name");
            newName.textContent = input.value;
            input.replaceWith(newName);
            saveProduct();
            updateRightPart();
        })
    }
})

productList.addEventListener("click", function(event) {
    if (event.target.classList.contains("plus-button")) {
        const productItem = event.target.closest(".product-item");
        const amount = productItem.querySelector(".amount");
        const minusButton = productItem.querySelector(".minus-button");

        let quantity = Number(amount.textContent);
        quantity++;

        amount.textContent = quantity;
        if (quantity > 1) {
            minusButton.disabled = false;
        }
        saveProduct();
        updateRightPart();
    }
})

productList.addEventListener("click", function(event) {
    if (event.target.classList.contains("minus-button")) {
        const productItem = event.target.closest(".product-item");
        const amount = productItem.querySelector(".amount");

        let quantity = Number(amount.textContent);
        if (quantity > 1) {
            quantity--;
            amount.textContent = quantity;
        }

        if (quantity === 1) event.target.disabled = true;
        saveProduct();
        updateRightPart();
    }
})

function updateRightPart() {
    noBought.innerHTML = "<h2>Залишилося</h2>";
    bought.innerHTML = "<h2>Куплено</h2>";
    const allProduct = document.querySelectorAll(".product-item");
    allProduct.forEach(function(productItem) {
        const name = productItem.querySelector(".product-name").textContent;
        const amount = productItem.querySelector(".amount").textContent;
        const span = document.createElement("span");

        span.classList.add("product-item-right");
        span.innerHTML = `${name} <span class="amount-right">${amount}</span>`;

        if (productItem.classList.contains("bought")) bought.appendChild(span);
        else noBought.appendChild(span);
    })
}

function saveProduct() {
    localStorage.setItem("products", productList.innerHTML);
}
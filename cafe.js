// -- JAVASCRIPT CAFE! -- //

// Products //

let products = {
  
  whiteCoffee: {
    stock: 4,
    price: 4
  },

  blackCoffee: {
    stock: 7,
    price: 3.5
  },
  
  muffin: {
    stock: 5,
    price: 8.99
  },

  eggs: {
    stock: 4,
    price: 4.49
  }
  
}

function displayProducts () {
  
  /*document.getElementById("whiteCoffee").innerHTML = `White Coffee: ${products.whiteCoffee.stock}`
  document.getElementById("blackCoffee").innerHTML = `Black Coffee: ${products.blackCoffee.stock}`
  document.getElementById("muffin").innerHTML = `Muffin: ${products.muffin.stock}`
  document.getElementById("eggs").innerHTML = `Eggs: ${products.eggs.stock}`*/
  
  
  let displayNames = Object.keys(products)
  
  for (let i = 0; i < displayNames.length; i++){

    const el = document.getElementById(displayNames[i])
    const item = products[displayNames[i]]

    el.innerHTML = `${displayNames[i]}: ${item.stock}`

    if (item.stock === 0){
      el.classList.add("noStock")     
    }
    else{
      el.classList.remove("noStock")     
    }
  }
}


displayProducts()

function formatProductName(name){
  let result = ""
  for (let i = 0; i < name.length; i++){
    const char = name[i]

    if(char === char.toUpperCase() && i !== 0){
      result += " " 
    }
    result += char
    
  }
  let results = result.slice(1).toUpperCase()
  return result
}


// Customers //

let customer = {
  order: []
}

let minOrderSize = 1
let maxOrderSize = 5

function generateCustomOrder () {
  // get range size for the order in a range, 1-5
  // make a new array of the things they're ordering
  // assign the new order to the customer object
  // display the customer order

  let orderSize = getRandomInt(minOrderSize, maxOrderSize)

  let newOrder = []

  let productNames = Object.keys(products)

  for (let i = 0; i < orderSize; i++){
    let productName = productNames[getRandomInt(0, productNames.length - 1)]
    newOrder.push(productName)
  }

  customer.order = newOrder
  displayCustomerOrder()

}

document.getElementById("customerButton").onclick = generateCustomOrder

/*document.querySelector("#customerButton").addEventListener('click', (event) => {
  generateCustomOrder()
})*/

function displayCustomerOrder (){
  document.getElementById("customerOrder").innerHTML = `Customer Order: ${customer.order}!`
}

// Transactions
cash = 0

function displayCash () {
  document.getElementById("cash").innerHTML = `Money in the bank: $${cash}`
}
displayCash()

function fillOrder (){
  /* 
  Make a variable to keep track of our sale total
  Loop through the customer order array
  If we have their product in stock, sell it and keep track of stock
  If we do not have it, alert we're out of this product.
  Add the sale total to our cash.
  Clear the customer order
  */

  let saleTotal = 0

  for (let i = 0; i < customer.order.length; i++){
    
    let productName = customer.order[i]

    if (products[productName].stock > 0){
      
      products[productName].stock--
      saleTotal += products[productName].price

    }     
    else{
        alert(`Sadly we have sold out of ${productName} for today, please try again tommorrow!`)
    }

  }

  cash += saleTotal
  customer.order = []
  displayProducts()
  displayCash()
  displayCustomerOrder()
}

document.getElementById('fillOrder').onclick = fillOrder
// UTIL

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



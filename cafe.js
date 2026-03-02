// -- JAVASCRIPT CAFE! -- //

// Products //

let products = {
  whiteCoffee: {
    stock: 4,
    price: 4,
  },

  blackCoffee: {
    stock: 7,
    price: 3.5,
  },

  muffin: {
    stock: 5,
    price: 8.99,
  },

  eggs: {
    stock: 4,
    price: 4.49,
  },
}

function displayProducts() {
  /*document.getElementById("whiteCoffee").innerHTML = `White Coffee: ${products.whiteCoffee.stock}`
  document.getElementById("blackCoffee").innerHTML = `Black Coffee: ${products.blackCoffee.stock}`
  document.getElementById("muffin").innerHTML = `Muffin: ${products.muffin.stock}`
  document.getElementById("eggs").innerHTML = `Eggs: ${products.eggs.stock}`*/

  let displayNames = Object.keys(products)

  for (let i = 0; i < displayNames.length; i++) {
    const productName = displayNames[i]
    const el = document.getElementById(productName)
    const item = products[productName]

    const formattedName = formatProductName(productName)

    el.innerHTML = `${formattedName}: ${item.stock}`

    if (item.stock === 0) {
      el.classList.add('noStock')
    } else {
      el.classList.remove('noStock')
    }
  }
}

displayProducts()

// Customers //

let customer = {
  order: [],
  money: 0,
}

let minOrderSize = 1
let maxOrderSize = 5

function generateCustomOrder() {
  // get range size for the order in a range, 1-5
  // make a new array of the things they're ordering
  // assign the new order to the customer object
  // display the customer order

  let orderSize = getRandomInt(minOrderSize, maxOrderSize)

  customer.money = getRandomInt(5, 30)

  //document.querySelector("#customerMoney").innerHTML = `Customer Money: $${customer.money}`

  let newOrder = []

  let productNames = Object.keys(products)

  for (let i = 0; i < orderSize; i++) {
    let productName = productNames[getRandomInt(0, productNames.length - 1)]
    newOrder.push(productName)
  }

  customer.order = newOrder
  displayCustomerOrder()

}

document.getElementById('customerButton').onclick = generateCustomOrder

/*document.querySelector("#customerButton").addEventListener('click', (event) => {
  generateCustomOrder()
})*/

function displayCustomerOrder() {
  /*let order = ""
  for (let i = 0; i < customer.order.length; i++){
    const orderItem = formatProductName(customer.order[i])
    
    order = order + orderItem + ", "
    
  }
  document.getElementById("customerOrder").innerHTML = `Customer Order: ${order}!`*/

  const formattedOrder = customer.order.map(formatProductName)
  const orderString = formattedOrder.join(', ')
  document.getElementById('customerOrder').innerHTML =
    `Customer Order: ${orderString}!`
  document.querySelector("#orderTotal").innerHTML = `Order Total: $${calculateOrderTotal(customer.order)}`
  document.querySelector("#customerMoney").innerHTML = `Customer Money: $${customer.money}`
}

// Transactions
let cash = 0

function displayCash() {
  document.getElementById('cash').innerHTML = `Money in the bank: $${cash}`
}
displayCash()

function fillOrder() {
  /* 
  Make a variable to keep track of our sale total
  Loop through the customer order array
  If we have their product in stock, sell it and keep track of stock
  If we do not have it, alert we're out of this product.
  Add the sale total to our cash.
  Clear the customer order
  */

  /*Calculate total
  Compare calculated total to customers money - if not alert and clear order
  Check if items are in stock - if any are out alert and clear
  else we can commit the sale.
  */

  let saleTotal = 0
  let orderTotal = calculateOrderTotal(customer.order)

  if (orderTotal > customer.money) {
    alert(`Sadly you don't have enough money for that order, Please leave now!`)
    clearCustomerOrder()
    return
  }

  const counts = {}

  for (const name of customer.order){
    if (counts[name] === undefined){
      counts[name] = 1
    } else {
      counts[name] = counts[name] + 1
    } 
  }

  for (const name in counts){
    if (products[name].stock < counts[name]){
      alert(`Sadly we have sold out of ${formatProductName(name)} for today, please try again tomorrow.`)
      clearCustomerOrder()
      return
    } 
  }
  
  for (const name in counts){
    products[name].stock -= counts[name]
    saleTotal += products[name].price * counts[name]
  }


  /*for (let i = 0; i < customer.order.length; i++) {
    let productName = customer.order[i]

    if (products[productName].stock > 0) {
      products[productName].stock--
      saleTotal += products[productName].price
    } 
    else {
      alert(
        `Sadly we have sold out of ${productName} for today, please try again tommorrow!`
      )
      clearCustomerOrder()
      return
    }
  }*/

  cash += saleTotal

  displayProducts()
  displayCash()
  clearCustomerOrder()

  /*for (let i = 0; i < customer.order.length; i++){
    
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
  displayCustomerOrder()*/
}

document.getElementById('fillOrder').onclick = fillOrder

// UTIL

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function formatProductName(name) {
  let result = ''
  for (let i = 0; i < name.length; i++) {
    const char = name[i]

    if (char === char.toUpperCase() && i !== 0) {
      result += ' '
    }
    result += char
  }
  result = result[0].toUpperCase() + result.slice(1)
  return result
}

function calculateOrderTotal(order) {
  let orderTotal = 0

  for (let i = 0; i < order.length; i++) {
    orderTotal += products[order[i]].price
  }
  return orderTotal
}

function clearCustomerOrder(){
  customer.money = 0
  customer.order = []
  displayCustomerOrder()
}
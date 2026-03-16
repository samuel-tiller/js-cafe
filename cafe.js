// -- JAVASCRIPT CAFE! -- //

// Products //

const products = {
  whiteCoffee: {
    stock: 4,
    price: 4,
    wholesaleCost: 2.25
  },

  blackCoffee: {
    stock: 7,
    price: 3.5,
    wholesaleCost: 2
  },

  muffin: {
    stock: 5,
    price: 8.99,
    wholesaleCost: 4.50
  },

  eggs: {
    stock: 4,
    price: 4.49,
    wholesaleCost: 3 
  }
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
    const elws = document.getElementById(productName + "Wholesale")

    const formattedName = formatProductName(productName)

    elws.innerHTML = `Wholesale Cost: ${products[productName].wholesaleCost}`


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

const customer = {
  order: [],
  money: 0,
}

const eggStyles = ["poached", "fried", "scrambled", "raw"]

let minOrderSize = 1
let maxOrderSize = 5

function generateCustomOrder() {
  // get range size for the order in a range, 1-5
  // make a new array of the things they're ordering
  // assign the new order to the customer object
  // display the customer order

  let orderSize = getRandomInt(minOrderSize, maxOrderSize)

  customer.money = getRandomInt(5, 30)

  let newOrder = []

  let productNames = Object.keys(products)

  for (let i = 0; i < orderSize; i++) {
    let productName = productNames[getRandomInt(0, productNames.length - 1)]
    if(productName === "eggs"){
      newOrder.push({name: productName, style: eggStyles[getRandomInt(0, eggStyles.length -1)]})
    }else{
      newOrder.push({name: productName})
    }
  }

  customer.order = newOrder
  displayCustomerOrder()

}

document.getElementById('customerButton').onclick = generateCustomOrder

function displayCustomerOrder() {

  const formattedOrder = customer.order.map(item =>{
    if(item.style !== undefined){
      return `${formatProductName(item.name)} (${formatProductName(item.style)})`
    }else{
      return `${formatProductName(item.name)}`
    }
  })
  const orderString = formattedOrder.join(', ')
  document.getElementById('customerOrder').innerHTML = `Customer Order: ${orderString}!`
  document.querySelector("#orderTotal").innerHTML = `Order Total: $${calculateOrderTotal(customer.order).toFixed(2)}`
  document.querySelector("#customerMoney").innerHTML = `Customer Money: $${customer.money}`
}

// Transactions
let cash = 0

function displayCash() {
  document.getElementById('cash').innerHTML = `Bank Balance: $${cash.toFixed(2)}`
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
  Check if all items are in stock - if any are out alert and clear
  else we can commit the sale.
  */

  let orderTotal = calculateOrderTotal(customer.order)

  if (orderTotal > customer.money) {
    alert(`Sadly you don't have enough money for that order, Please leave now!`)
    clearCustomerOrder()
    return
  }

  const counts = {}

  for (const item of customer.order){
    const name = item.name
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
  }

  cash += orderTotal

  displayProducts()
  displayCash()
  clearCustomerOrder()
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
    orderTotal += products[order[i].name].price
  }
  return orderTotal
}

function clearCustomerOrder(){
  customer.money = 0
  customer.order = []
  displayCustomerOrder()
}

//Eventlisteners for Restock buttons
let displayNames = Object.keys(products)

for (let i = 0; i < displayNames.length; i++){
  const name = displayNames[i]
  document.querySelector("#restock-" + name).addEventListener('click', (event)=>{
    wholesaleCheck(event.target.id)
  })
}


function wholesaleCheck(check){
  /*Add event listener to button
  Compare event.target wholesale price to total cash
  If okay add 1 stock and minus wholesaleCost from cash
  If not enough cash - alert and say not enough cash.
  */
  let name = check.slice(8)
  let cost = products[name].wholesaleCost
  let formattedName = formatProductName(name)

  if (cash < cost){
    let short = cost - cash
    alert(`Sorry but you are $${short.toFixed(2)} short to purchase anymore ${formattedName}, come back when you have more`)
    return
  }else{
    cash -= cost
    products[name].stock += 1
    displayCash()
    displayProducts()
  }
}
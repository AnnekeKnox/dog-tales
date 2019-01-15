function Product(image, description, price, sku) {
    this.image = image
    this.description = description
    this.price = price
    this.sku = sku
}

var catalogue = [
    new Product("https://cdn.shopify.com/s/files/1/0478/4301/products/x-small-2-25-tall-dogs-up-to-5-lbs_1000x.jpg?v=1462912167", "Kong Chew Toy", 80.00, "KONG1"),
    new Product("https://cdn.bmstores.co.uk/images/hpcProductImage/imgFull/309481-small-rope-toy-5.jpg", "Rope Chew Toy", 60.00, "ROPE1")
    
]

var cart = {
    products: [],
    shipping : 0.00,
    discount: 0.00,
    setProducts: function() {
        sessionStorage.setItem("cart", JSON.stringify(this.products))
    },
    getProducts: function() {
        var productsJSON = sessionStorage.getItem("cart")
        if (productsJSON === null) {
            this.products = []
        }
        else {this.products = JSON.parse(productsJSON)}
    },
    alertCartTotal: function() {
        var totalPrice = this.calculateTotal()
        alert("Cart Updated! \nYour current total is: " + "R" + totalPrice)
    },
    calculateTotal: function() {
        var totalPrice = 0.00 + cart.shipping - cart.discount
        this.getProducts()
        for (var i=0; i<this.products.length; i++) {
            totalPrice += this.products[i].price
        }
        return totalPrice
    }
}

var addToCart = function(sku) {
    for (var i=0; i<catalogue.length; i++) {
        if (catalogue[i].sku == sku) {
            cart.getProducts()
            cart.products.push(catalogue[i])
            cart.setProducts()
            console.log(cart)
            break
        }
    }
    cart.alertCartTotal()
}

var catalogueHtmlBuilder = {
    catalogue: catalogue,
    build: function(){
        var catalogueOverview = document.getElementById("catalogueOverview")
       

        for (var i=0; i<catalogue.length; i++) {
            var div = document.createElement('div')
            div.classList.add("productBox")
            div.classList.add("pull-left")

            var img = document.createElement('img')
            img.src = this.catalogue[i].image
            div.appendChild(img)

            var descriptionSpan = document.createElement('span')
            descriptionSpan.innerHTML = this.catalogue[i].description
            div.appendChild(descriptionSpan)

            var priceSpan = document.createElement('span')
            priceSpan.innerHTML = "R" + this.catalogue[i].price
            div.appendChild(document.createElement('br'))
            div.appendChild(priceSpan)

            var shoppingcartButton = document.createElement('button') 
            shoppingcartButton.setAttribute("onclick","addToCart('"+ this.catalogue[i].sku +"')")
            shoppingcartButton.setAttribute("id","addToCartBtn");
            var buttonText = document.createTextNode('Add to Cart') 
            shoppingcartButton.appendChild(buttonText) 
            div.appendChild(shoppingcartButton) 

            catalogueOverview.appendChild(div)
        }
    }
}

var cartHtmlBuilder = {
    build: function() {
        cart.getProducts()
        var cartOverview = document.getElementById("cartOverview")
        var cartTotal = cart.calculateTotal()

        var productHeadings = document.createElement('tr')

        var productHeader = document.createElement('th')
        var productHeaderText = document.createTextNode("Product")
        productHeader.appendChild(productHeaderText)
        productHeadings.appendChild(productHeader)

        var quantityHeader = document.createElement('th')
        var quantityHeaderText = document.createTextNode("Quantity")
        quantityHeader.appendChild(quantityHeaderText)
        productHeadings.appendChild(quantityHeader)

        var priceHeader = document.createElement('th')
        var priceHeaderText = document.createTextNode("Price")
        priceHeader.appendChild(priceHeaderText)
        productHeadings.appendChild(priceHeader)

        cartOverview.appendChild(productHeadings)

        for (var i=0; i<cart.products.length; i++) {
            var tableRow = document.createElement('tr')

            var productName = document.createElement('td')
            var productText = document.createTextNode(cart.products[i].description)
            productName.appendChild(productText)
            tableRow.appendChild(productName)

            var quantity = document.createElement('td')
            var quantityText = document.createTextNode(1)
            quantity.appendChild(quantityText)
            tableRow.appendChild(quantity)
            
            var price = document.createElement('td')
            var priceText = document.createTextNode(cart.products[i].price)
            price.appendChild(priceText)
            tableRow.appendChild(price)

            cartOverview.appendChild(tableRow)
        }

        var shipping = document.createElement('tr')
        var shippingHeader = document.createElement('th')
        shippingHeader.setAttribute("colspan", "3")
        shipping.appendChild(shippingHeader)
        var shippingText = document.createTextNode("Delivery Charge:")
        shippingHeader.appendChild(shippingText)
        
        var shippingAmount = document.createElement('tr')
        var shippingData = document.createElement('td')
        shippingData.classList.add("subtotal")
        shippingData.appendChild(document.createTextNode("R" + cart.shipping))
        shippingData.setAttribute("colspan", "3")
        shippingAmount.appendChild(shippingData)

        var discountCoupon = document.createElement('tr')
        var discountHeader = document.createElement('th')
        discountHeader.setAttribute("colspan", "3")
        discountCoupon.appendChild(discountHeader)
        var discountText = document.createTextNode("Discount Coupon:")
        discountHeader.appendChild(discountText)

        var discountAmount = document.createElement('tr')
        var discountData = document.createElement('td')
        discountData.classList.add("subtotal")
        discountData.appendChild(document.createTextNode("R -" + cart.discount))
        discountData.setAttribute("colspan", "3")
        discountAmount.appendChild(discountData)

        var subTotal = document.createElement('tr')
        var subTotalHeader = document.createElement('th')
        subTotalHeader.setAttribute("colspan", "3")
        subTotal.appendChild(subTotalHeader)
        var subTotalText = document.createTextNode("Sub Total:")
        subTotalHeader.appendChild(subTotalText)

        var subTotalAmount = document.createElement('tr')
        var subTotalData = document.createElement('td')
        subTotalData.classList.add("subtotal")
        subTotalData.appendChild(document.createTextNode("R" + cartTotal))
        subTotalData.setAttribute("colspan", "3")
        subTotalAmount.appendChild(subTotalData)
        
        cartOverview.appendChild(shipping)
        cartOverview.appendChild(shippingAmount)
        cartOverview.appendChild(discountCoupon)
        cartOverview.appendChild(discountAmount)
        cartOverview.appendChild(subTotal)
        cartOverview.appendChild(subTotalAmount)

        var total = document.createElement('tr')
        var totalHeader = document.createElement('th')
        totalHeader.setAttribute("colspan", "3")
        total.appendChild(totalHeader)

        var totalText = document.createTextNode("Total + VAT(15%):")
        totalHeader.appendChild(totalText)

        var totalAmount = document.createElement('tr')
        var totalData = document.createElement('td')
        totalData.classList.add("total")
        var totalWithVat = cartTotal + ((cartTotal/100)*15)
        totalData.appendChild(document.createTextNode("R" + totalWithVat))
        totalData.setAttribute("colspan", "3")
        totalAmount.appendChild(totalData)

        cartOverview.appendChild(total)
        cartOverview.appendChild(totalAmount)
    },
    rebuild: function() {
        document.getElementById("cartOverview").innerHTML=""
        this.build()
    }
}

var setDeliveryOption = function(deliveryType) {
    if (deliveryType == "standard") {
        cart.shipping = 100.00
    }
    else {cart.shipping = 200.00}
    console.log(cart)

    cartHtmlBuilder.rebuild()
}

var applyCoupon = function() {
   var validCoupon = document.getElementById("coupon").value == "dogtales123"

   if (validCoupon) {
    cart.discount = 50.00
    cartHtmlBuilder.rebuild()
   }
   else {
       alert("Invalid Coupon")
   }  
}

var confirmOrder = function() {
    var generateGuid = function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
    var referenceNumber = generateGuid()
    alert(`Your order was successful! \n Your reference number is: ${referenceNumber}`)
}

var cataloguePromotTextBuilder = function(){
    var promptCatalgogueText = " "
    for (var i = catalogue.length - 1; i >= 0; i--) {
        promptCatalgogueText += `${catalogue[i].description}(SKU:${catalogue[i].sku}), ${catalogue[i].price} \n`
    }
    return promptCatalgogueText
}
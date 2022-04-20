
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const mobileNav = document.getElementById("mobile-nav")
const modar = $(".modar")
const mobileNavList = $(".mobile__nav-list")
const searchInput = $('.header-search-box input')
const searchBtn = $('#searching')
const searchResults = $('#search-results')
const productWrap = $('#product-wrap')
const descriptionBtn = $('#description')
const reviewBtn = $('#review')
const starElement = $('#stars')
var addToCartBtn
var productItems
var quantityElements
const currentCartList = $('.current-cart__list')
const currentCart = $('.current-cart')
const cartTable = $('.cart-table tbody')
const updateCartBtn = $('#update-cart')
const totalCost = $('#total-cost')
const subtotalCost = $('#subtotal-cost')
const dataAR = [
    {
        id: 0,
        name: 'Cà chua Đà lạt',
        price: 20000,
        description: 'cà chua Đà Lạt tươi ngon',
        image: "./img/cachua.jpg"
    },
    {
        id: 1,
        name: 'Bắp mỹ',
        price: 12000,
        description: 'cà tím Lâm Đồng tươi ngon',
        image: "./img/fruit2.jpg"
    },  
    {
        id: 2,
        name: 'Cá Basa cắt lát tươi ngon giá sỉ',
        price: 15000,
        description: 'thanh long Đồng Nai tươi ngon',
        image: "./img/fruit3.jpg"
    },
    {
        id: 3,
        name: 'Bơ 034',
        price: 36000,
        description: 'thanh long Đồng Nai tươi ngon',
        image: "./img/fruit4.jpg"
    },
    {
        id: 4,
        name: 'Chuối vàng',
        price: 12000,
        description: 'thanh long Đồng Nai tươi ngon',
        image: "./img/fruit5.jpg"
    },
    {
        id: 5,
        name: 'Nho tím',
        price: 55000,
        description: 'thanh long Đồng Nai tươi ngon',
        image: "./img/nho.jpg"
    },
    {
        id: 6,
        name: 'Sầu riêng miền Tây',
        price: 132000,
        description: 'thanh long Đồng Nai tươi ngon',
        image: "./img/saurieng.jpg"
    },
    {
        id: 7,
        name: 'Bưởi da xanh',
        price: 40000,
        description: 'thanh long Đồng Nai tươi ngon',
        image: "./img/buoidaxanh.jpg"
    },
    {
        id: 8,
        name: 'cải bó xôi',
        price: 13000,
        description: 'thanh long Đồng Nai tươi ngon',
        image: "./img/caiboxoi.jpg"
    },
    {
        id: 9,
        name: 'Dâu tây Đà Lạt',
        price: 125000,
        description: 'thanh long Đồng Nai tươi ngon',
        image: "./img/dautay.jpg"
    },

]

const app = {
    useCart : [],
    starCount: 0,
    saveCart : function() {
            localStorage.setItem('CART_STORAGE', JSON.stringify(this.useCart))
    },

    getCart : function() {
        return JSON.parse(localStorage.getItem('CART_STORAGE')) || []
    },

    searchOnInput: function(value) {
        return dataAR.filter( (data) => {
            let trueName = data.name.toUpperCase()
            return trueName.includes(value.toUpperCase())
        })
    },

    productRender: function() {
        let html =
            dataAR.map(function (data, index) {
            return `                        
                    <div class="col l-3 m-4 c-6">
                    <div data-index="${index}" class="product-item">
                        <a href="./product.html">                                
                        <div class="item-img-wrap">
                            <img src="${data.image}" alt="fruit">
                        </div>
                        <div class="product-item-name">${data.name}</div>
                        <div class="product-item-cost">${data.price} đ</div>  
                    </a>
                    <div class="cart__added"><i class="fas fa-cart-plus"></i></div>
                    </div>
                </div>`
        })
        productWrap.innerHTML = html.join('')
    },

    currentCartRender : function() {
        let html = this.useCart.map((item) => {
            return `                            
            <li class="current-cart__item">
                <div class="cart__item-icon" style="background-image: url(${item.image})"></div>
                <div class="cart__item-info">
                    <div class="cart__item-name">${item.name}</div>
                    <div class="cart__item-price">${item.price} đ</div>
                </div>
                <div class="cart__item-price">${item.quantity}</div>
            </li>`
        })
        if(html.length > 0) {
            currentCartList.innerHTML = html.join('')
        }
    },

    cartRender : function() {
        const emptyCartHtml = `                            
                            <tr>
                            <td colspan="6" style="text-align:center; height: 100px"> Giỏ hàng trống</td>
                            </tr>`
                            
        let totalMoney = 0
        let subTotalMoney = 0
        let html = this.useCart.map( (item, index) => {
            let subTotal = item.price*item.quantity
            totalMoney +=subTotal
            return `
                <tr>
                    <td id="remove"><i class="fas fa-trash-alt"></i></td>
                    <td class="product__image"><img src="${item.image}" alt="fruit"></td>
                    <td class="product__name">${item.name}</td>
                    <td class="product__price">${item.price} đ</td>
                    <td class="product__quantity-wrap">                            
                        <div class="product__quantity" data-index="${index}">
                            <div class="product__quantity-option less">-</div>
                            <input type="number" class="quantity" value="${item.quantity}"></input>
                            <div class="product__quantity-option more">+</div>
                        </div>
                    </td>
                    <td class="product__subtotal">${subTotal} đ</td>
                </tr>`
        })
        if(html.length > 0) {
            cartTable.innerHTML = html.join('')
        } else {
            cartTable.innerHTML = emptyCartHtml
        }
        // total render 
        subTotalMoney = totalMoney
        totalCost.innerText = totalMoney + ' đ'
        subtotalCost.innerText = subTotalMoney + ' đ'
    },

    addToCart : function (productIndex, quantity) {
        let isHave = false
        this.useCart.forEach((item) => {
             if(item.id == dataAR[productIndex].id) {
                item.quantity += quantity
                isHave = true
             }  
        })
        if(!isHave) {
          let index = this.useCart.push(dataAR[productIndex])
          this.useCart[index-1].quantity = 0;
          this.useCart[index-1].quantity += quantity;
        }  
    },

    //xử lý sự kiện 
    handleEvent: function() {
        
        //modar
        modar.onclick = function () {
            mobileNavList.style.display = "none"
            modar.style.display = "none"
        }

        //header nav
        mobileNav.onclick = function () {
            mobileNavList.style.display = "block"
            modar.style.display = "block"
        }
        
        //search
        searchInput.oninput = () => {
            let results = this.searchOnInput(searchInput.value.trim())
            let html =''
            html = results.map(function (data, index) {
                return `<li><a href="./product.html">${data.name}: ${data.price} đồng</a></li>`
            })
            if(html.length > 0) {
                searchResults.style.display = 'block'
                searchResults.innerHTML = html.join('')
            }
        }
    
        document.onclick = (e) => {
            if(!e.target.classList.contains('header-search-box')) {
                searchResults.style.display = 'none'
            }
        }


        //add to cart

            //shop page
        if(productItems) {
            productItems.forEach((productItem) => {
                productItem.onclick = (e) => {
                    let addBtn = e.target.closest('.cart__added')
                   if(addBtn) {
                        this.addToCart(productItem.dataset.index, 1)
                        this.currentCartRender()
                        this.saveCart()
                   }
                }
            })
        }
        
            //product page 
        if(addToCartBtn) {
            let quantity = $('.quantity')
            addToCartBtn.onclick = () => {
                this.addToCart(addToCartBtn.dataset.index, +quantity.value)
                this.saveCart()         
            }
        }

        //quantity 
        if(quantityElements) {
            Array.from(quantityElements).forEach( (quantityElement) => {
                quantityElement.onclick = (e) => {
                   let quantity = quantityElement.querySelector('.quantity')
                   // trừ
                    if(e.target.classList.contains('less')) {
                        if(quantity.value > 1) {
                            quantity.value--
                        } 
                    } 
                    // cộng
                    if(e.target.classList.contains('more')) {
                        quantity.value++
                    }
                }
            })
        }

        //current cart 

        if(currentCart) {
            this.currentCartRender()
            this.saveCart()
        }


        //decription & review tab
        if(descriptionBtn) {
            descriptionBtn.onclick = () => {
                descriptionBtn.classList.add('nav-btn__active')
                reviewBtn.classList.remove('nav-btn__active')
                $('.tab-panel__description').style.display = 'block'
                $('.tab-panel__rate').style.display = 'none'
            } 
        }

        if(reviewBtn) {
            reviewBtn.onclick = () => {
                reviewBtn.classList.add('nav-btn__active')
                descriptionBtn.classList.remove('nav-btn__active')
                $('.tab-panel__description').style.display = 'none'
                $('.tab-panel__rate').style.display = 'block'
            } 
        }

        // update Cart
        if(updateCartBtn) {
            updateCartBtn.onclick = () => {
                Array.from(quantityElements).forEach( (quantityElement) => {
                    this.useCart[quantityElement.dataset.index].quantity = quantityElement.querySelector('.quantity').value
                })
                this.saveCart()
                location.reload()    
            }
        }

        //star react 
        if(starElement) {

            let starArr = starElement.querySelectorAll('i')
            for(let i = 0; i < 5; i++) {
                starArr[i].onclick = () => {
                    this.starCount = i + 1
                    for(let j = 0; j < 5; j++) {
                        if(j <= i) {
                            starArr[j].classList.add('active')
                        } else {
                            starArr[j].classList.remove('active')
                        }
                    }
                }
            }
        }
    },
    init: function() {
        this.useCart = this.getCart()
        if(productWrap) {
            this.productRender()
        }
        
        if(cartTable) {
            this.cartRender()
        }

        productItems = $$('.product-item')
        quantityElements = $$('.product__quantity')
        addToCartBtn = $('.add-btn')
        this.handleEvent()
    }
}
app.init()

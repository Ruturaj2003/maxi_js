class Product {
    constructor(title, img, desc, price) {
        this.title = title;
        this.imageUrl = img;
        this.description = desc;
        this.price = price;
    }
}
//To Garentee the struct we create this
class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;
        if (shouldRender) {
            this.render();
        }
    }
    //Below is for someone to know that there is a method render
    //Basically the render method will be fully Overwritten by render of sub-Classes
    render() {}
    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        //It will check for a truthy value
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        //It will also check if it is an array
        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        //We are not using this.rootElemnt as we store it in a const and not in a property or instance
        return rootElement;
    }
}
// You can Inherit from only one class
class ShoppingCart extends Component {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `
        <h2>
            Total: \$ ${this.totalAmount.toFixed(2)}
        </h2>
        `;
    }

    get totalAmount() {
        const sum = this.items.reduce((prevValue, curItem) => {
            return parseFloat(prevValue) + parseFloat(curItem.price);
        }, 0);
        return sum;
    }
    //Calling constuctor of Shopping cart to then call constructor
    //from Component class ie:Base class
    constructor(renderHookId) {
        //We will use super if our parent Class also has constructor
        //Always use super at the begining
        //The Render Hook ID is being passed from Shop Class
        super(renderHookId);
    }

    addProduct(product) {
        //The code below is fine but we are practicing Setters
        //this.items.push(product);
        // this.totalOutput.innerHTML = `
        // <h2>
        //     Total: \$ ${1}
        // </h2>
        // `;
        const updatedItems = [...this.items];
        updatedItems.push(product);
        //This will trigger the setter
        this.cartItems = updatedItems;
    }

    orderProducts(product) {
        console.log('Ordering in PROGRESS!!!');
        console.log(this.items);
    }

    render() {
        //Inheriting
        const cartEl = this.createRootElement('section', 'cart');
        //const cartEl = document.createElement('section');
        cartEl.innerHTML = `
        <h2>
            Total: \$ ${0}
        </h2>
        <button>
            Order Now!
        </button>
        `;
        //cartEl.className = 'cart';
        const orderButton = cartEl.querySelector('button');
        orderButton.addEventListener('click', this.orderProducts.bind(this));

        this.totalOutput = cartEl.querySelector('h2');

        //return cartEl; No longer needed as it was removed from Shop
    }
}

//Below Class is used in ProductList Class
class ProductItem extends Component {
    //This class is for rendering a single Item
    constructor(product, renderHookId) {
        super(renderHookId, false);
        this.product = product;
        this.render();
    }

    addToCart() {
        console.log(`Adding ${this.product.title} to cart`);
        App.addProductToCart(this.product);
    }

    render() {
        //const prodEl = document.createElement('li');
        // prodEl.className = 'product-item';
        const prodEl = this.createRootElement('li', 'product-item');
        prodEl.innerHTML = `
            <div>
                <img src = "${this.product.imageUrl}" alt = "${this.product.title}">
                <div class = "product-item__content">
                    <h2>
                        ${this.product.title}
                    </h2>
                    <h3>
                        \$${this.product.price}
                    </h3>
                    <p>
                        ${this.product.description}
                    </p>
                    <button> 
                        Add to Cart
                    </button>
                </div>
            </div>`;
        const addCartButton = prodEl.querySelector('button');
        //It will tell JS that addTocart refets to current one and not anyother that are alreay created
        //Here we used bind this as this would refer to addCartButton and not Class;
        addCartButton.addEventListener('click', this.addToCart.bind(this));
        //return prodEl;
    }
}

class ProductList extends Component {
    //Private prop
    #products = [];
    constructor(renderHookId) {
        super(renderHookId, false);
        this.render();
        this.#fetchProducts();
    }

    #fetchProducts() {
        this.#products = [
            new Product(
                'A Carpet',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYMXxljApMIXoEPr-aztx4ehOKmIZjWOqBUw&usqp=CAU',
                'A beautiful carpet',
                '19.99'
            ),

            new Product(
                'A Expensive Carpet',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYMXxljApMIXoEPr-aztx4ehOKmIZjWOqBUw&usqp=CAU',
                'Same carpet as above but EXPENSIVE!!!',
                '89.99'
            ),
        ];
        this.renderProducts();
    }

    renderProducts() {
        for (const prod of this.#products) {
            new ProductItem(prod, 'prod-list');
        }
    }
    //Below is method shorthand notation
    render() {
        //Dom manupulation of sorts below
        //Below is reomoved as it will give us error as Ul wont be created until we return it
        //But we render product Item in the loop which will try to add li to DOM where ul does not exist yet
        //const prodList = document.createElement('ul');
        this.createRootElement('ul', 'product-list', [
            new ElementAttribute('id', 'prod-list'),
        ]);

        if (this.#products && this.#products.length > 0) {
            this.renderProducts();
        }

        //We made a Id here so we can use it in componet as Rendering Hook
        //prodList.id = 'prod-list';
        //Styling the un-ordered list
        //prodList.className = 'product-list';

        //Creating each product in DOM as a list-item
        // for (const prod of this.products) {
        //     new ProductItem(prod, 'prod-list');

        //Attaching the each product in ul
        //const productItem = new ProductItem(prod, 'prod-list');
        //productItem.render();
        //we need to call our render to return the obj
        //const prodEl = productItem.render();
        //prodList.append(prodEl);
        //}
        //return prodList;
    }
}

//This is combination of Cart and Product list
class Shop extends Component {
    constructor() {
        super();
    }
    render() {
        // Main Hook is now here as here we will be rendering everything
        //const renderHook = document.getElementById('app');
        //Shop has its own cart now {I guess} and we can acess it
        this.cart = new ShoppingCart('app');
        new ProductList('app');

        //this.cart.render();
        //We will not use const since the only use was render and that is done
        //const productList = new ProductList('app');
        //productList.render();
        //renderHook.append(prodListEl);
        //ProdListEl is removeed as we no longer get any retrun value
        //const prodListEl = productList.render();
        //const cartEl = this.cart.render(); Replaced Using Inhertance
        //renderHook.append(cartEl);
    }
}

class App {
    //It is optional; For readability.
    static cart;

    static init() {
        const shop = new Shop();
        //shop.render();
        //Render should be first since cart is in render and till
        //we dont call render there wont be any cart
        this.cart = shop.cart;
    }
    //We are using it as proxy
    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();

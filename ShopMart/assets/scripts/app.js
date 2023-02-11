class Product {
    constructor(title, img, desc, price) {
        this.title = title;
        this.imageUrl = img;
        this.description = desc;
        this.price = price;
    }
}

class ShoppingCart {
    items = [];

    render() {
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `
        <h2>
            Total: \$ ${0}
        </h2>
        <button>
            Order Now!
        </button>
        `;
        cartEl.className = 'cart';
        return cartEl;
    }
}

//Below Class is used in ProductList Class
class ProductItem {
    //This class is for rendering a single Item
    constructor(product) {
        this.product = product;
    }

    addToCart() {
        console.log(`Adding ${this.product.title} to cart`);
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
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
        return prodEl;
    }
}

class ProductList {
    products = [
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
    constructor() {}
    //Below is method shorthand notation
    render() {
        //Dom manupulation of sorts below

        const prodList = document.createElement('ul');
        //Styling the un-ordered list
        prodList.className = 'product-list';

        //Creating each product in DOM as a list-item
        for (const prod of this.products) {
            //Attaching the each product in ul
            const productItem = new ProductItem(prod);
            //we need to call our render to return the obj
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }
        return prodList;
    }
}

//This is combination of Cart and Product list
class Shop {
    render() {
        // Main Hook is now here as here we will be rendering everything
        const renderHook = document.getElementById('app');
        const cart = new ShoppingCart();
        const cartEl = cart.render();
        const productList = new ProductList();
        const prodListEl = productList.render();
        renderHook.append(cartEl);
        renderHook.append(prodListEl);
    }
}

const shop = new Shop();
shop.render();

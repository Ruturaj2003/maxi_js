class Product {
    constructor(title, img, desc, price) {
        this.title = title;
        this.imageUrl = img;
        this.description = desc;
        this.price = price;
    }
}

//Below Class is used in ProductList Class
class ProductItem {
    //This class is for rendering a single Item
    constructor(product) {
        this.product = product;
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
        const renderHook = document.getElementById('app');
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
        renderHook.append(prodList);
    }
}

const productList = new ProductList();
productList.render();

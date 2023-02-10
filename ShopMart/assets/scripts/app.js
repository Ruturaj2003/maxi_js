const productList = {
    products: [
        {
            title: 'A Carpet',
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYMXxljApMIXoEPr-aztx4ehOKmIZjWOqBUw&usqp=CAU',
            price: 19.99,
            description: 'A beautiful carpet',
        },
        {
            title: 'A Expensive Carpet',
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYMXxljApMIXoEPr-aztx4ehOKmIZjWOqBUw&usqp=CAU',
            price: 89.99,
            description: 'Same carpet as above but! EXPENSIVE',
        },
    ],
    //Below is method shorthand notation
    render() {
        //Dom manupulation of sorts below
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        //Styling the un-ordered list
        prodList.className = 'product-list';

        //Creating each product in DOM as a list-item
        for (const prod of this.products) {
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
            <div>
                <img src = "${prod.imageUrl}" alt = "${prod.title}">
                <div class = "product-item__content">
                    <h2>
                        ${prod.title}
                    </h2>
                    <h3>
                        \$${prod.price}
                    </h3>
                    <p>
                        ${prod.description}
                    </p>
                    <button> 
                        Add to Cart
                    </button>
                </div>
            </div>`;
            //Attaching the each product in ul
            prodList.append(prodEl);
        }
        renderHook.append(prodList);
    },
};

//Calling method render in product list to render them on page
productList.render();

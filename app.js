function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    
    const productImage = document.createElement('div');
    productImage.classList.add('product-image');
    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.title;
    productImage.appendChild(img);
    
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    const productTitle = document.createElement('h3');
    productTitle.classList.add('product-title');
    productTitle.textContent = product.title;
    const productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = `$${product.price}`;
    const productDescription = document.createElement('p');
    productDescription.classList.add('product-description');
    productDescription.textContent = product.description;
    const productButton = document.createElement('a');
    productButton.classList.add('product-button');
    productButton.textContent = 'View Details';
    productButton.href = `product-detail.html?id=${product.id}`;
    
    productInfo.appendChild(productTitle);
    productInfo.appendChild(productPrice);
    productInfo.appendChild(productDescription);
    productInfo.appendChild(productButton);
    productCard.appendChild(productImage);
    productCard.appendChild(productInfo);
    
    return productCard;
}

function loadProducts() {
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load products. Server returned ' + response.status);
            }
            return response.json();
        })
        .then(products => {
            const productContainer = document.getElementById('product-container');            
            products.forEach(product => {
                const productCard = createProductCard(product);
                productContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error loading products:', error);
        });
}

function loadSections() {
    fetch('sections.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load sections. Server returned ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('header-text').textContent = data.headerText;
            
            document.getElementById('welcome-message').textContent = data.welcomeMessage;
            
            const bannerImage = document.getElementById('banner-image');
            bannerImage.src = data.bannerImage;
            bannerImage.alt = data.headerText;
            
            const infoSectionsContainer = document.getElementById('info-sections');
            
            data.infoSections.forEach(section => {
                const infoBlock = document.createElement('div');
                infoBlock.classList.add('info-block');
                const title = document.createElement('h3');
                title.textContent = section.title;
                const content = document.createElement('p');
                content.textContent = section.content;
                infoBlock.appendChild(title);
                infoBlock.appendChild(content);
                infoSectionsContainer.appendChild(infoBlock);
            });
        })
        .catch(error => {
            console.error('Error loading sections:', error);
        });
}

function initializeHomepage() {
    return new Promise((resolve, reject) => {
        Promise.all([
            fetch('products.json').then(response => response.json()),
            fetch('sections.json').then(response => response.json()),
        ])
        .then(([products, sections]) => {
            console.log('All data loaded successfully');
            loadProducts();
            loadSections();
            resolve({ products, sections });
        })
        .catch(error => {
            console.error('Error initializing homepage:', error);
            reject(error);
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeHomepage);
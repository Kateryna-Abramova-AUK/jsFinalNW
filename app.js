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
            document.getElementById('header-text').textContent = 'Welcome to Celestial Tea House';
            document.getElementById('welcome-message').textContent = 'Discover our authentic Chinese teas';
        });
}

function loadCategories() {
    fetch('categories.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load categories. Server returned ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const categoriesContainer = document.getElementById('categories-container');
            
            data.categories.forEach(category => {
                const categoryCard = document.createElement('div');
                categoryCard.classList.add('category-card');
                const categoryName = document.createElement('h3');
                categoryName.textContent = category.name;
                const categoryDescription = document.createElement('p');
                categoryDescription.textContent = category.description;
                categoryCard.appendChild(categoryName);
                categoryCard.appendChild(categoryDescription);
                categoriesContainer.appendChild(categoryCard);
            });
            
            const featuredContainer = document.getElementById('featured-content');
            const featured = data.featured;
            const featuredProduct = document.createElement('div');
            featuredProduct.classList.add('featured-product');
            const featuredTitle = document.createElement('h2');
            featuredTitle.textContent = featured.title;
            const featuredImage = document.createElement('img');
            featuredImage.src = featured.product.image;
            featuredImage.alt = featured.product.name;
            const featuredName = document.createElement('h3');
            featuredName.textContent = featured.product.name;
            const featuredDescription = document.createElement('p');
            featuredDescription.textContent = featured.product.description;
            const featuredButton = document.createElement('a');
            featuredButton.classList.add('product-button');
            featuredButton.textContent = 'View Details';
            featuredButton.href = `product-detail.html?id=${featured.product.id}`;
            
            featuredProduct.appendChild(featuredTitle);
            featuredProduct.appendChild(featuredImage);
            featuredProduct.appendChild(featuredName);
            featuredProduct.appendChild(featuredDescription);
            featuredProduct.appendChild(featuredButton);
            featuredContainer.appendChild(featuredProduct);
        })
        .catch(error => {
            console.error('Error loading categories:', error);
            const categoriesSection = document.querySelector('.categories-section');
            if (categoriesSection) {
                categoriesSection.style.display = 'none';
            }
            
            const featuredSection = document.querySelector('.featured-section');
            if (featuredSection) {
                featuredSection.style.display = 'none';
            }
        });
}

function initializeHomepage() {
    Promise.all([
        fetch('products.json').then(response => response.json()),
        fetch('sections.json').then(response => response.json()),
        fetch('categories.json').then(response => response.json())
    ])
    .then(([products, sections, categories]) => {
        console.log('All data loaded successfully');
    })
    .catch(error => {
        console.error('Error initializing homepage:', error);
    });
    
    loadProducts();
    loadSections();
    loadCategories();
}

document.addEventListener('DOMContentLoaded', initializeHomepage);
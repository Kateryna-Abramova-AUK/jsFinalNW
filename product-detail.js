function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

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
    const productButton = document.createElement('a');
    productButton.classList.add('product-button');
    productButton.textContent = 'View Details';
    productButton.href = `product-detail.html?id=${product.id}`;
    
    productInfo.appendChild(productTitle);
    productInfo.appendChild(productPrice);
    productInfo.appendChild(productButton);

    productCard.appendChild(productImage);
    productCard.appendChild(productInfo);
    
    return productCard;
}

function createStarRating(rating) {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('review-rating');
    starsContainer.innerHTML = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    return starsContainer;
}

function loadProductDetail() {
    const productId = getUrlParameter('id');
    
    fetch(`product-${productId}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load product details. Server returned ' + response.status);
            }
            return response.json();
        })
        .then(product => {
            document.title = `${product.title} - Celestial Tea House`;
            document.getElementById('product-title-breadcrumb').textContent = product.title;
            const detailContainer = document.getElementById('product-detail-container');
            const detailContent = document.createElement('div');
            detailContent.classList.add('product-detail-content');
            const imageSection = document.createElement('div');
            imageSection.classList.add('product-detail-image');
            const productImage = document.createElement('img');
            productImage.src = product.imageUrl;
            productImage.alt = product.title;
            imageSection.appendChild(productImage);
            const infoSection = document.createElement('div');
            infoSection.classList.add('product-detail-info');
            const productTitle = document.createElement('h1');
            productTitle.textContent = product.title;
            const productPrice = document.createElement('div');
            productPrice.classList.add('product-detail-price');
            productPrice.textContent = `$${product.price}`;
            const productMeta = document.createElement('div');
            productMeta.classList.add('product-meta');
            
            if (product.category) {
                const categoryInfo = document.createElement('p');
                categoryInfo.innerHTML = `<strong>Category:</strong> ${product.category}`;
                productMeta.appendChild(categoryInfo);
            }
            
            if (product.origin) {
                const originInfo = document.createElement('p');
                originInfo.innerHTML = `<strong>Origin:</strong> ${product.origin}`;
                productMeta.appendChild(originInfo);
            }
            
            if (product.harvestSeason) {
                const seasonInfo = document.createElement('p');
                seasonInfo.innerHTML = `<strong>Harvest:</strong> ${product.harvestSeason}`;
                productMeta.appendChild(seasonInfo);
            }
            
            const productDescription = document.createElement('div');
            productDescription.classList.add('product-detail-description');
            productDescription.textContent = product.longDescription || product.description;
            
            let brewingSection = '';
            if (product.brewingInstructions) {
                brewingSection = document.createElement('div');
                brewingSection.classList.add('product-brewing');
                const brewingTitle = document.createElement('h3');
                brewingTitle.textContent = 'Brewing Instructions';
                const brewingText = document.createElement('p');
                brewingText.textContent = product.brewingInstructions;
                brewingSection.appendChild(brewingTitle);
                brewingSection.appendChild(brewingText);
            }
            
            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('add-to-cart');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.addEventListener('click', () => {
                alert(`${product.title} has been added to your cart!`);
            });
            
            infoSection.appendChild(productTitle);
            infoSection.appendChild(productPrice);
            infoSection.appendChild(productMeta);
            infoSection.appendChild(productDescription);
            if (brewingSection) {
                infoSection.appendChild(brewingSection);
            }
            infoSection.appendChild(addToCartButton);
            detailContent.appendChild(imageSection);
            detailContent.appendChild(infoSection);
            
            if (product.reviews && product.reviews.length > 0) {
                const reviewsSection = document.createElement('div');
                reviewsSection.classList.add('product-reviews');
                const reviewsTitle = document.createElement('h2');
                reviewsTitle.textContent = 'Customer Reviews';
                reviewsSection.appendChild(reviewsTitle);
                product.reviews.forEach(review => {
                    const reviewElement = document.createElement('div');
                    reviewElement.classList.add('review');
                    const reviewHeader = document.createElement('div');
                    reviewHeader.classList.add('review-header');
                    const reviewAuthor = document.createElement('strong');
                    reviewAuthor.textContent = review.author;
                    const starRating = createStarRating(review.rating);
                    reviewHeader.appendChild(reviewAuthor);
                    reviewHeader.appendChild(starRating);
                    const reviewComment = document.createElement('p');
                    reviewComment.textContent = review.comment;
                    reviewElement.appendChild(reviewHeader);
                    reviewElement.appendChild(reviewComment);
                    reviewsSection.appendChild(reviewElement);
                });
                
                detailContainer.appendChild(detailContent);
                detailContainer.appendChild(reviewsSection);
            } else {
                detailContainer.appendChild(detailContent);
            }
            
            if (product.relatedProducts && product.relatedProducts.length > 0) {
                loadRelatedProducts(product.relatedProducts);
            } else {
                const relatedSection = document.querySelector('.related-products');
                if (relatedSection) {
                    relatedSection.style.display = 'none';
                }
            }
        })
        .catch(error => {
            console.error('Error loading product details:', error);
            document.getElementById('product-detail-container').innerHTML = '';
        });
}

function loadRelatedProducts(relatedProductIds) {
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load related products. Server returned ' + response.status);
            }
            return response.json();
        })
        .then(products => {
            const relatedProducts = products.filter(product => 
                relatedProductIds.includes(product.id)
            );
            
            if (relatedProducts.length === 0) {
                const relatedSection = document.querySelector('.related-products');
                if (relatedSection) {
                    relatedSection.style.display = 'none';
                }
                return;
            }
            
            const relatedContainer = document.getElementById('related-products-container');
            relatedContainer.innerHTML = '';
            
            relatedProducts.forEach(product => {
                const productCard = createProductCard(product);
                relatedContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error loading related products:', error);
            const relatedSection = document.querySelector('.related-products');
            if (relatedSection) {
                relatedSection.style.display = 'none';
            }
        });
}


document.addEventListener('DOMContentLoaded', loadProductDetail);
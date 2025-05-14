fetch('./products.json')
  .then(response => response.json())
  .then(products => {
    const productList = document.getElementById('product-box');

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');


      const productName = document.createElement('h2');
      productName.textContent = product.name;

      const productPrice = document.createElement('p');
      productPrice.textContent = `$${product.price}`;

      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.alt = product.name;

      const addButton = document.createElement('button');
      addButton.textContent = 'Add';
      addButton.onclick = () => {
        alert(`${product.name} was added!`);
      };

      productCard.appendChild(productImage);
      productCard.appendChild(productName);
      productCard.appendChild(productPrice);
      productCard.appendChild(addButton);

      productList.appendChild(productCard);
    });
  })
  .catch(error => {
    console.error('Error fetching products:', error);
    const productList = document.getElementById('product-list');
    productList.innerHTML = '<p>Failed to load products. Please try again later.</p>';
  });

fetch('./section.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('header-text').textContent = data.headerText;
    document.getElementById('img').src = data.bannerImage;
    const infoContainer = document.getElementById('info-sections');
    data.infoSections.forEach(section => {
      const block = document.createElement('div');
      block.innerHTML = `<h3>${section.title}</h3><p>${section.content}</p>`;
      infoContainer.appendChild(block);
    });
  })
  .catch(error => console.error('Error loading homepage sections:', error));


  Promise.all([
    fetch('./products.json').then(response => response.json()),
    fetch('./section.json').then(response => response.json())
  ])
  .then(([products, sections]) => {
    console.log('Products, Sections: SUCCESS');
  })
  .catch(error => {
    console.error('Error loading products or sections:', error);
  });
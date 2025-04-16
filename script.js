document.addEventListener("DOMContentLoaded", function () {
    const newProductBtn = document.getElementById("newProduct");
    const addImageBtn = document.getElementById("addImageBtn");
    const productForm = document.getElementById("productForm");
    const productsContainer = document.getElementById("productsContainer");
    const imageInput = document.getElementById("image");
    const imagePreview = document.getElementById("imagePreview");
    const productsLenght = document.getElementById("productsLenght");
    const cartModal = document.getElementById("cartModal");
    const cartTotalElement = document.getElementById("cartTotal");

    let products = [];
    let cartItems = [];  // Corrected: Using cartItems array

    newProductBtn.addEventListener('click', function () {
        productForm.classList.remove('d-none');
    });

    addImageBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const titre = document.getElementById('titre').value;
        const imageFile = imageInput.files[0]; // Get the selected file
        const prix = document.getElementById('prix').value;

        if (!titre || !imageFile || !prix) {
            alert("Please fill in all fields.");
            return;
        }

        // Convert image to base64 data URL
        const reader = new FileReader();
        reader.onloadend = function () {
            const imageDataURL = reader.result;

            const newProduct = {
                titre: titre,
                image: imageDataURL,
                prix: prix
            };

            products.push(newProduct);
            afficherProducts();
            productForm.classList.add('d-none');
            productForm.reset(); // Clear the form
            imagePreview.style.display = 'none'; // Hide the preview
        }

        reader.readAsDataURL(imageFile);

    });

    imageInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                imagePreview.setAttribute("src", this.result);
                imagePreview.style.display = "block";
            });

            reader.readAsDataURL(file);
        } else {
            imagePreview.setAttribute("src", "#");
            imagePreview.style.display = "none";
        }
    });

    function afficherProducts() {
        productsContainer.innerHTML = ""; // Clear existing content

        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('col-md-4', 'mb-3');

            productDiv.innerHTML = `
                        <div class="card">
                            <img src="${product.image}" class="card-img-top  object-fit: cover;" alt="${product.titre}">
                            <div class="card-body">
                                <h5 class="card-title"> ${product.titre}</h5>
                                <p class="card-text">Prix : ${product.prix} DH</p>
                             <div class="card-footer d-flex justify-content-center">
                                <button onclick="ajouterAuPanier(${index})" class="btn">Ajouter au panier</button>
                             </div>
                            </div>
                        </div>
                    `;

            productsContainer.appendChild(productDiv);
        });
    }

    window.ajouterAuPanier = function (index) {
        cartItems.push(products[index]);
        productsLenght.textContent = cartItems.length;
        afficherCart();
        console.log(index);

    };
    /*
    function calculateTotal() {
        let total = 0;
        cartItems.forEach(item => {
            total += parseFloat(item.prix); // Ensure price is treated as number
        });
        cartTotalElement.textContent = `Total: ${total.toFixed(2)} DH`;
    }
*/
    function afficherCart() {
        cartModal.innerHTML = '';  // Clear previous content
        if (cartItems.length === 0) {
            const div = document.createElement('div');
            div.className = 'alert alert-danger fw-bold text-center w-100';
            div.textContent = 'No products found';
            cartModal.appendChild(div);
        } else {
            cartItems.forEach((element, index) => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `
                produit : ${element.titre} - ${element.prix} DH
                <button class="btn btn-danger" onclick="supprimerDuPanier(${index})">Supprimer</button>`;
                cartModal.appendChild(li);
            });
        }
    }

    window.supprimerDuPanier = function (index) {
        cartItems.splice(index, 1);
        afficherCart();
        productsLenght.textContent = cartItems.length; // Update cart count
    };

    // Initial display of products
    afficherProducts();
});
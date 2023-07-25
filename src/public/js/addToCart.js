function addToCart(cartId, productId) {
    // Get the quantity value for the selected product
    const quantity = parseInt(document.getElementById(`quantity${productId}`).value, 10);

    // Make a POST request to the addToCart endpoint with the chosen quantity
    fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cantidad: quantity })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response if needed
        console.log(data);
        // You can also redirect to the cart page or show a success message
      })
      .catch(error => {
        // Handle errors if needed
        console.error(error);
      });
  }
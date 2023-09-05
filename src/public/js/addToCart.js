function addToCart(cartId, productId) {
  
  const quantity = parseInt(document.getElementById(`quantity${productId}`).value, 10);


    fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cantidad: quantity })
    })
      .then(async response => {
        if (response.ok) {
          return response.json();
        } else {
          const data = await response.json();
          return await Promise.reject(data.error);
        }
      })
      .then(data => {
        Swal.fire({
          toast: true,
          icon: 'success',
          title: `${data.message}`,
          position: 'bottom-right',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        })
      })
      .catch(error => {
        Swal.fire({
            title: 'No se pudo agregar el producto',
            text: `${error}`,
            icon: 'error'
        })
      })
  }
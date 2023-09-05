function generateTicket(cartId) {

  Swal.fire({
    title: '¿Estás seguro de finalizar la compra?',
    text: 'Esta acción generará un ticket de compra.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Sí, Finalizar Compra',
    cancelButtonColor: '#d33',
    cancelButtonText: 'cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/api/carts/${cartId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(async (response) => {
        const data = await response.json()
        if (response.ok) {
          return data
        } else {
          throw data.error
        }
      })
      .then((data) => {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
        location.reload()
        })
      })
      .catch((error) => {
        Swal.fire({
          title: 'No se pudo completar el proceso',
          text: `${error}`,
          icon: 'error'
        })
      })
    }
  })
}


function clearCart(cartId) {
  
  fetch(`/api/carts/${cartId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(async response => {
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw data.error;
    }
  })
  .then(data => {
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: `${data.message}`,
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      location.reload()
    })
  })
  .catch(error => {
    Swal.fire({
      title: `${error}`,
      icon: 'error'
    })
  })
}

function deleteFromCart(cartId, productId) {
  
  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(async response => {
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        throw data.error;
    }
  })
  .then(data => {
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: `${data.message}`,
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      location.reload()
    })
  })
  .catch(error => {
    Swal.fire({
      title: `${error}`,
      icon: 'error'
    })
  })
}
const socket = io()


// eliminar producto
const dataForm = document.getElementById('formDelete')
const id = document.getElementById('deleteId')

dataForm.addEventListener('submit', evt => {
  evt.preventDefault()
  Swal.fire({
    title: 'Eliminar Producto?',
    text: `Se eliminará el producto con ID: ${id.value}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Eliminar',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar'
  })
  .then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/products/${id.value}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',    
          }       
        })
        const data = await response.json()
        if (response.status === 200) {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            socket.emit('deleteProduct', {})
          })
          
        } else {
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: `${data.error}`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'No se pudo completar el proceso',
          text: `${error}`,
          icon: 'error'
        })
      }
    }
  })
})

socket.on('newList', data => {
  let list=''
  data.forEach(({_id, title, code, price, category, description, stock, thumbnail, owner}) => {
      list +=`
    <div class="px-5 row align-items-start">
      <div class="col-2 mb-2">
        <img class="img-fluid" src="${thumbnail}" alt="${title}" />
      </div>
      <div class="col-6 mb-2">
        <p class="h5 mb-2">${_id}</p>
        <p class="pl-1 mb-1 h6">${title}</p>
        <p class="pl-1 mb-1 h6">Code: ${code}</p>
        <p class="pl-1 mb-1">Category: ${category}</p>
        <p class="pl-1 mb-1">Description: ${description}</p>
        <p class="pl-1 mb-1">Owner: ${owner}</p>
      </div>
      <div class="col-4 d-flex flex-column align-items-end">
        <p class="h5 mt-2">$${price}</p>
        <p class="p-1 h5">Stock: ${stock}</p>
      </div>
      <hr />
    </div>`
  })
  document.getElementById('productList').innerHTML = list

})



//Agregar producto
const addForm = document.getElementById('addForm')
const product = document.querySelectorAll('input')
const title = document.getElementById('title')
const price = document.getElementById('price')
const code = document.getElementById('code')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const description = document.getElementById('description')
const status = document.getElementById('status')
const thumbnail = document.getElementById('thumbnail')


addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  try {
    const formData = {
      title: title.value,
      description: description.value,
      price: parseInt(price.value),
      code: parseInt(code.value),
      stock: parseInt(stock.value),
      category: category.value,
      thumbnail: thumbnail.value,
    };

    const response = await fetch(`/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), 
    })

    const data = await response.json()

    if (response.status === 201) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      })
      socket.emit('addProduct', {})

    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: data.error,
        showConfirmButton: false,
        timer: 1500,
      })
    }
  } catch (error) {
    console.log(error)
    Swal.fire({
      title: 'No se pudo completar el proceso',
      text: 'Error al crear el producto',
      icon: 'error',
    })
  }
})


socket.on('productAdded', (newData) => {

  let list=''
  newData.forEach(({_id, title, code, price, category, description, stock, thumbnail, owner}) => {
      list +=`
      <div class="px-5 row align-items-start">
      <div class="col-2 mb-2">
        <img class="img-fluid" src="${thumbnail}" alt="${title}" />
      </div>
      <div class="col-6 mb-2">
        <p class="h5 mb-2">${_id}</p>
        <p class="pl-1 mb-1 h6">${title}</p>
        <p class="pl-1 mb-1 h6">Code: ${code}</p>
        <p class="pl-1 mb-1">Category: ${category}</p>
        <p class="pl-1 mb-1">Description: ${description}</p>
        <p class="pl-1 mb-1">Owner: ${owner}</p>
      </div>
      <div class="col-4 d-flex flex-column align-items-end">
        <p class="h5 mt-2">$${price}</p>
        <p class="p-1 h5">Stock: ${stock}</p>
      </div>
      <hr />
    </div>`
  })

  document.getElementById('productList').innerHTML = list

})
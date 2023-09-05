const socket = io()


// eliminar producto
const dataForm = document.getElementById('formDelete')
const id = document.getElementById('deleteId')

dataForm.addEventListener('submit', evt => {
    evt.preventDefault()
    Swal.fire({
        title: 'Eliminar Producto?',
        text: `Se eliminara el producto con ID: ${id.value}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonColor: '#d33',
        cancelButtonText: 'cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            socket.emit('deleteProduct', {id: id.value})
        }
    })
})

socket.on('newList', data => {
    if(data.status === 'error'){
        Swal.fire({
            title: 'Producto no encontrado',
            text: `${data.message}`,
            icon: 'error'
        })
        return {status: 'error', mesage: 'Producto no encontrado'}
    }

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
    Swal.fire({
        title: 'Producto Eliminado',
        timer: 8000,
        icon: 'success'
    })
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


addForm.addEventListener('submit', evt => {
    evt.preventDefault()

    socket.emit('addProduct', {
        title: title.value,
        description: description.value,
        price: parseInt(price.value),
        code: parseInt(code.value),
        stock: parseInt(stock.value),
        category: category.value,
        thumbnail: [thumbnail.value]
    })
})


socket.on('productAdded', (newData) => {
    if(newData.status === 'error'){
        Swal.fire({
            title: 'No se pudo agregar el producto',
            text: `${newData.message}`,
            icon: 'error'
        })
        return {status: 'error', message: 'No se pudo agregar el producto'}
    }
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
    Swal.fire({
        title: 'Producto Agregado Correctamente',
        timer: 8000,
        icon: 'success'
    })
})
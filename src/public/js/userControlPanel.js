function deleteUser(uid){
    fetch(`/api/session/${uid}/deleteUser`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(async response => {
        const data = await response.json();
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

function changeRole(uid){
  fetch(`/api/session/premium/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  })
  .then(async response => {
      const data = await response.json();
      console.log(data)
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
function deleteUsersWithoutActivity(){
  fetch(`/api/session/deleteUsers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
  })
  .then(async response => {
      const data = await response.json()
      console.log(data)
      if (response.ok) {
          return data
      } else {
          throw data.error;
      }
    })
    .then(data => {
      if(data.status === 'error'){
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          location.reload()
        })
      }
    })
    .catch(error => {
      Swal.fire({
        title: `${error}`,
        icon: 'error'
      })
    })
}

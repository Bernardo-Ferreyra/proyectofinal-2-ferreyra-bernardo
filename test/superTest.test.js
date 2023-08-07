const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const requester = supertest('http://localhost:8080')


describe('Testing del proyecto C39750', ()=>{
     describe('test de session', ()=>{
        let userId 
        let userRole
        let userEmail
        let cookie 
        it('El servicio POST en el endpoint /api/session/register debe crear un usuario correctamente', async()=>{
            const userMock = {
                username: 'userTest',
                first_name:'UserSupertest',
                last_name: 'userSuperSuperTest',
                email: 'userTest@usertest.com',
                date_of_birth: '2023-10-10',
                password: 'test123'
            }
            const response = await requester.post('/api/session/register').send(userMock)
            expect(response.statusCode).to.be.equal(201)
            expect(response).to.be.ok
            expect(response.body).to.have.property('status').that.is.equal('success')
            expect(response.body).to.have.property('payload')
            expect(response._body.payload).to.have.property('_id')

            userId = response.body.payload._id
            userRole = response.body.payload.role
            userEmail = response.body.payload.email

        })


        it('el servicio POST /api/session/login debe logear un usuario correctamente y devolver una cookie', async()=>{
            const userMock = {
                email: 'userTest@usertest.com',
                password: 'test123'
            }
            const response = await requester.post('/api/session/login').send(userMock)
            const cookieResult = response.headers['set-cookie'][0]
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1],
            }
            expect(response).to.be.ok
            expect(response.statusCode).to.be.equal(302)
            expect(cookieResult).to.be.ok
            expect(cookie.name).to.be.ok.and.eql('coderCookieToken')
            expect(cookie.value).to.be.ok
        })

        it('El servicio GET /api/session/current debe enviar el jwt del usuario y devolver los datos', async()=>{
            const response =await requester.get('/api/session/current').set('Cookie',[`${cookie.name}=${cookie.value}`])
            expect(response).to.be.ok
            expect(response.statusCode).to.be.equal(200)
            expect(response.body).to.have.property('status').that.is.equal('success')
            expect(response.body.payload).to.have.property('email').that.is.equal(userEmail)
            expect(cookie.name).to.be.ok.and.eql('coderCookieToken')
            expect(cookie.value).to.be.ok
        })

        it('El servicio GET /api/session/preimum/:uid debe cambiar el role del usuario de user a premium y viceversa', async()=>{
            const response =await requester.get(`/api/session/premium/${userId}`)
            expect(response).to.be.ok
            expect(response.statusCode).to.be.equal(200)
            expect(response.body).to.have.property('status').that.is.equal('success')
            expect(response.body).to.have.property('role')
            expect(response.body.role).to.not.equal(userRole)
        })
        it('El servicio GET /api/session/logout debe cerrar la sesión de usuario y redireccionar a /login', async()=>{
            const response = await requester.get('/api/session/logout').set('Cookie', [`${cookie.name}=${cookie.value}`])
            /* console.log(response) */
            expect(response).to.be.ok
            expect(response.statusCode).to.be.equal(302)
            /* console.log(response.headers['set-cookie'][0]) */
            console.log(response)
            console.log(response.header)
            /* expect(response.headers['set-cookie']).to.be.an('array')
            expect(response.headers['location']).to.be.equal('/login') */
        })
    }) 
    describe('test de productos',() =>{
/*         it('el endpoint POST /api/products/ debe crear un producto correctamente',async ()=>{
            const productMock = {
                title: 'productoSuperTest',
                description: 'producto de prueba Supertest', 
                price: 123, 
                code: 'p123', 
                stock: 123, 
                category: 'producto de prueba Supertest'
            }
            const response = await requester.post('/api/products').send(productMock)
            console.log(response.statusCode)
            console.log(response._body)
            console.log(response.ok)
            expect(response.statusCode).to.equal(201)
            expect(response.body).to.have.property('payload')
            expect(response._body.payload).to.have.property('_id')
        }) */

/*         it('el endpoint GET /api/products/ debe traer todo los productos',async ()=>{
            const response = await requester.get('/api/products')
            expect(response).to.be.ok
            expect(response.statusCode).to.be.equal(200)
            expect(response.body).to.have.property('payload').that.is.an('object')
            expect(response.body.payload).to.have.property('docs').that.is.an('array').that.is.not.empty
        }) */

/*         it('el endpoint GET /api/products/:pid debe traer un producto por su id',async ()=>{
            let pid = '64d0557ec14cdd337e44a8c0'
            const response = await requester.get(`/api/products/${pid}`)
            console.log(response.body)
            expect(response).to.be.ok
            expect(response.statusCode).to.be.equal(200)
            expect(response.body).to.have.property('status').that.is.equal('success')
            expect(response.body).to.have.property('payload').that.is.an('object')
            expect(response.body.payload).to.have.property('_id')
        }) */

/*         it('El endpoint PUT /api/products/:pid debe actualizar un producto correctamente', async () => {
            let pid = '64d0557ec14cdd337e44a8c0'
            const updatedProductMock = {
                code: 1111,
                price: 1200,
                stock: 232,
                category: 'productosupersupertest'
            };
            const response = await requester.put(`/api/products/${pid}`).send(updatedProductMock)
            expect(response).to.be.ok
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.have.property('status').that.is.equal('success')
            expect(response.body).to.have.property('payload').that.is.an('object')
            expect(response.body.payload.code).to.equal(updatedProductMock.code)
            expect(response.body.payload.price).to.equal(updatedProductMock.price)
            expect(response.body.payload.category).to.equal(updatedProductMock.category)
        }) */
/* 
        it('El endpoint DELETE /api/products/:pid debe eliminar un producto correctamente', async () => {
            let pid = '64d0557ec14cdd337e44a8c0'
            const response = await requester.delete(`/api/products/${pid}`)
            console.log(response)

            expect(response.statusCode).to.equal(200);
            expect(response.body).to.have.property('payload');
            expect(response.body.payload).to.have.property('_id');
            expect(response.body.payload._id).to.equal(petId);
        }) */


    })

    
})
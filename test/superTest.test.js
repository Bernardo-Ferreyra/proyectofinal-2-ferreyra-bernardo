const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const requester = supertest('http://localhost:8080')


describe('Testing del proyecto', ()=>{
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

        it('El endpoint DELETE /api/products/:pid debe eliminar un producto correctamente', async () => {
            let pid = '64d0557ec14cdd337e44a8c0'
            const response = await requester.delete(`/api/products/${pid}`)
            console.log(response)

       /*      expect(response.statusCode).to.equal(200);
            expect(response.body).to.have.property('payload');
            expect(response.body.payload).to.have.property('_id');
            expect(response.body.payload._id).to.equal(petId); */
        })


    })

    /* describe('test de session', ()=>{
        let cookie */
/*         it('debe registrar u usuario correctamente ', async()=>{
            const userMock = {
                username: 'userTest',
                first_name:'UserSupertest',
                last_name: 'userSuperSuperTest',
                email: 'userTest@usertest.com',
                date_of_birth: new Date(),
                password: 'test123'
            }
            const response = await requester.post('/api/session/register').send(userMock)
            console.log(response)
            expect(response.statusCode).to.be.equal(200)
        }) */


/*         it('el servicio debe logear un usuario correctamente y devuelve una cookie', async()=>{
            const userMock = {
                email: 'userTest@usertest.com',
                password: 'test123'
            }
            const response = await requester.post('/api/session/login').send(userMock)
            const cookieResult = response.headers['set-cookie'][0]
            console.log(cookieResult)
            expect(cookieResult).to.be.ok
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1],
            }
            expect(cookie.name).to.be.ok.and.eql('coderCookieToken')
            expect(cookie.value).to.be.ok
        }) */

/*         it('debe enviar el jwt del usuario y consultar la ruta current', async()=>{
            const response =await requester.get('/api/session/current').set('Cookie',[`${cookie.name}=${cookie.value}`])
            console.log(response)
        }) */
    /* }) */
})
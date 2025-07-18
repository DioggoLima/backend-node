import { searchAllProducts, searchProductById, insertProduct, searchProductByName, updateProduct, deleteProduct } from "../repositories/products.repository.js";

export const listProducts = async (fastify, opt) => {
    fastify.route({
        url: '/products',
        method: 'GET',
        schemma: {},
        handler: async function (request, replay) {
            try {
                console.log('Received request [/products]')
                let listProducts = { products: [] }
                const productsReceived = await searchAllProducts()
                listProducts.products.push(...productsReceived)
                replay.send(listProducts)
            } catch (err) {
                console.error('[ERROR] verifique o motivo do erro', err)
            }
        }
    })
}

export const getProductById = async (fastify, opt) => {
    fastify.route({
        url: '/product/:id',
        method: 'GET',
        schemma: {},
        handler: async function (request, replay) {
            try {
                console.log('Received request [/product/:id]')
                const { id } = request.params
                const product = await searchProductById(id)
                if (product)
                    replay.send(product)
            } catch (err) {
                console.error('[ERROR] verifique o motivo do erro', err)
            }
        }
    })
}

export const registerNewProduct = async (fastify, opt) => {
    fastify.route({
        url: '/product',
        method: 'POST',
        schemma: {},
        handler: async function (request, replay) {
            try {
                console.log('Received request POST register [/product]')
                const { name, description, price, stock } = request.body
                const productRegistered = await insertProduct(name, description, price, stock)
                replay.send(productRegistered)
            } catch (err) {
                console.error('[ERROR] Verifique o motivo do erro,', err)
            }
        }
    })
}

export const getProducts = async (fastify, opt) => {
    fastify.route({
        url: '/product',
        method: 'GET',
        schemma: {},
        handler: async function (request, replay) {
            try {
                console.log('Received request [/product]')
                const { name } = request.query

                if (name) {
                    let receivedProduct = await searchProductByName(name)
                    replay.send(receivedProduct)
                } else {
                    let receivedProducts = await searchAllProducts()
                    replay.send(receivedProducts)
                }
            } catch (err) {
                console.error('[ERROR] verifique o motivo do erro', err)
            }
        }
    })
}

export const updateProductById = async (fastify, opt)=>{
    fastify.route({
        url: '/product',
        method: 'PUT',
        schemma: {},
        handler: async function (request, replay) {
            try{
                console.log('Received request POST register [/product]')
                const {id, name, description, price, stock} = request.body
                const productUpdated = await updateProduct(id, name, description, price, stock)
                
                const {status} = productUpdated
                if (status) {
                    replay.code(404).send(productUpdated)
                } else {
                    replay.code(201).send(productUpdated)
                }
            
            }catch(err){
                replay.code(500)
                console.error('[ERROR] Verifique o motivo do erro,', err)
            }
        }
    })
}

export const deleteProductById = async (fastify, opt)=>{
    fastify.route({
        url: '/product',
        method: 'DELETE',
        schemma: {},
        handler: async function (request, replay) {
            try{
                console.log('Received request DELETE register [/delete]')
                const {id} = request.query
                const productDeleted = await deleteProduct(id)
                
                const {status} = productDeleted
                if (status == "404") {
                    replay.code(404).send(productDeleted)
                } else {
                    replay.code(201).send(productDeleted)
                }
            
            }catch(err){
                replay.code(500)
                console.error('[ERROR] Verifique o motivo do erro,', err)
            }
        }
    })
}
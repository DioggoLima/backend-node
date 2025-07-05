import {searchAllProducts, searchProductById, insertProduct} from "../repositories/products.repository.js";

export const listProducts = async(fastify, opt) =>{
    fastify.route({
        url: '/products',
        method: 'GET',
        schemma: {},
        handler: async function (request, replay){
            try{
                console.log('Received request [/products]')
                let listProducts = {products: []}
                const productsReceived = await searchAllProducts()
                listProducts.products.push(... productsReceived)
                replay.send(listProducts)
            }catch(err){
                console.error('[ERROR] verifique o motivo do erro', err)
            }
        }
    })
}

export const getProductById= async(fastify, opt) =>{
    fastify.route({
        url: '/product/:id',
        method: 'GET',
        schemma: {},
        handler: async function (request, replay){
            try{
                console.log('Received request [/product/:id]')
                const {id} = request.params
                const product = await searchProductById(id)
                if(product)
                replay.send(product)
            }catch(err){
                console.error('[ERROR] verifique o motivo do erro', err)
            }
        }
    })
}

export const registerNewProduct = async (fastify, opt)=>{
    fastify.route({
        url: '/product',
        method: 'POST',
        schemma: {},
        handler: async function (request, replay) {
            try{
                console.log('Received request POST register [/product]')
                const {name, description, price, stock} = request.body
                const productRegistered = await insertProduct(name, description, price, stock)
                replay.send(productRegistered)
            }catch(err){
                console.error('[ERROR] Verifique o motivo do erro,', err)
            }
        }
    })
}
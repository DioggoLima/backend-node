// Importação da modulo fastify
import Fastify from 'fastify'
const PORT = 3000;
import { listUsers, registerNewUser, getUserById, getUsers, updateUserById, deleteUserByEmail} from './routes/users.controller.js';
import { listProducts, registerNewProduct, getProductById, getProducts, updateProductById, deleteProductById } from './routes/products.controller.js';

// Inicialização do modulo fastify
const app = Fastify({
    logger:true
})

app.register(listUsers, {prefix: '/v1'});
app.register(getUserById, {prefix: '/v1'})
app.register(registerNewUser, {prefix: '/v1'})
app.register(getUsers, {prefix: '/v1'})
app.register(updateUserById, {prefix: '/v1'})
app.register(deleteUserByEmail, {prefix: '/v1'})

app.register(listProducts, {prefix: '/v1'})
app.register(getProductById, {prefix: '/v1'})
app.register(registerNewProduct, {prefix: '/v1'})
app.register(getProducts, {prefix: '/v1'})
app.register(updateProductById, {prefix: '/v1'})
app.register(deleteProductById, {prefix: '/v1'})


app.get("/", (res, replay)=>{
    return {"server": "Hello Dev"}
})

// Estrutura de execução do servidor usando fastify
try {
    await app.listen({port: PORT})
}catch(err){
    app.log.error(err);
    process.exit(1)
}


// http.createServer((req, res)=>{
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end("Hello Node.js")
// }).listen(PORT,()=>{
//     console.log(`Server is up and running!!! 127.0.0.1:${PORT}`)
// })
// import http from "node:http"
// const http = require("node:http");
// Exemplo de rota GET usando fastify
// app.get("/hello", (res, replay)=>{
//     return {"hello": "nodeJS"}
// })

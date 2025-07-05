import { searchAllUsers, searchUserById, insertUser } from "../repositories/users.repository.js";

export const listUsers = async(fastify, opt) =>{
    fastify.route({
        url: '/users',
        method: 'GET',
        schemma: {},
        handler: async function (request, replay){
            try{
                console.log('Received request [/users]')
                let listUsers = {users: []}
                const usersReceived = await searchAllUsers()
                listUsers.users.push(... usersReceived)
                replay.send(listUsers)
            }catch(err){
                console.error('[ERROR] verifique o motivo do erro', err)
            }
        }
    })
}

export const getUserById= async(fastify, opt) =>{
    fastify.route({
        url: '/user/:id',
        method: 'GET',
        schemma: {},
        handler: async function (request, replay){
            try{
                console.log('Received request [/user/:id]')
                const {id} = request.params
                const user = await searchUserById(id)
                if(user)
                replay.send(user)
            }catch(err){
                console.error('[ERROR] verifique o motivo do erro', err)
            }
        }
    })
}

export const registerNewUser = async (fastify, opt)=>{
    fastify.route({
        url: '/user',
        method: 'POST',
        schemma: {},
        handler: async function (request, replay) {
            try{
                console.log('Received request POST register [/user]')
                const {name, email, password} = request.body
                const userRegistered = await insertUser(name, email, password)
                replay.send(userRegistered)
            }catch(err){
                console.error('[ERROR] Verifique o motivo do erro,', err)
            }
        }
    })
}
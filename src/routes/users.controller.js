import { searchAllUsers, searchUserById, insertUser, searchUserByName, updateUser, deleteUser} from "../repositories/users.repository.js";

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

export const getUsers = async (fastify, opt) => {
    fastify.route({
        url: '/user',
        method: 'GET',
        schemma: {},
        handler: async function (request, replay) {
            try {
                console.log('Received request [/user]')
                const { name } = request.query

                if (name) {
                    let receivedUser = await searchUserByName(name)
                    replay.send(receivedUser)
                } else {
                    let receivedUsers = await searchAllUsers()
                    replay.send(receivedUsers)
                }
            } catch (err) {
                console.error('[ERROR] verifique o motivo do erro', err)
            }
        }
    })
}

export const updateUserById = async (fastify, opt)=>{
    fastify.route({
        url: '/user',
        method: 'PUT',
        schemma: {},
        handler: async function (request, replay) {
            try{
                console.log('Received request POST register [/user]')
                const {id, name, email} = request.body
                const userUpdated = await updateUser(id, name, email)
                
                const {status} = userUpdated
                if (status) {
                    replay.code(404).send(userUpdated)
                } else {
                    replay.code(201).send(userUpdated)
                }
            
            }catch(err){
                replay.code(500)
                console.error('[ERROR] Verifique o motivo do erro,', err)
            }
        }
    })
}

export const deleteUserByEmail = async (fastify, opt)=>{
    fastify.route({
        url: '/user',
        method: 'DELETE',
        schemma: {},
        handler: async function (request, replay) {
            try{
                console.log('Received request DELETE register [/delete]')
                const {email} = request.query
                const userDeleted = await deleteUser(email)
                
                const {status} = userDeleted
                if (status == "404") {
                    replay.code(404).send(userDeleted)
                } else {
                    replay.code(201).send(userDeleted)
                }
            
            }catch(err){
                replay.code(500)
                console.error('[ERROR] Verifique o motivo do erro,', err)
            }
        }
    })
}
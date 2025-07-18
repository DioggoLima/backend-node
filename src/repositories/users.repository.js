import instanceDB from "../infra/connectDB.js";
import { hashPassword, comparePassword } from '../utils/cryptography.js'

export const searchAllUsers = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT id, name, email FROM users`;

    instanceDB.all(sql, [], (err, row) => {
      if (err) {
        console.error(err.message)
        reject(err)
      } else {
        console.log(row)
        resolve(row)
      }
    })
  })
}


export const searchUserByName = (searchName) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users WHERE name LIKE '%${searchName}%'`
        instanceDB.all(sql, [], (err, row) => {
            if (err){
                console.error('[ERROR] verifique a implementação', err)
                reject(err)
            } else {
                console.log(row)
                resolve(row)
            }
        })
    })
}

export const searchUserById = (userId) => {

  return new Promise((resolve, reject) => {
    let sql = `Select id, name, email FROM users WHERE id = ${userId}`
    instanceDB.get(sql, [], (error, row) => {
      if (error) {
        console.log(error.message)
        reject(error)
      } else {
        console.log(row)
        resolve(row)
      }
    })
  })
}

export const insertUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO users(name, email, password)
                 VALUES (? , ? , ?)
                `
    hashPassword(password).then((passwordHashed) => {

      let params = [name, email, passwordHashed]

      instanceDB.run(sql, params, (error) => {
        if (error) {
          console.error(error.message);
          reject(error)
        } else {
          let sql = 'SELECT last_insert_rowId() as id';
          instanceDB.get(sql, [], (error, row) => {
            if (error) {
              console.error(error.message);
              reject(error)
            } else {
              console.log(`O id do usuario inserido foi ${row.id}`)
              resolve({
                "id": row.id,
                "name": name,
                "email": email,
              }
              )
            }
          })
        }
      })
    })

  })
}

export const updateUser = (userId, userName, userEmail) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
        let params = [userName, userEmail, userId]
        instanceDB.run(sql, params, function (err) {
            if (err) {
                console.error("Algo deu errado", err.message)
                reject(err)
            } else {
                if (this.changes === 0) {
                    resolve({ message: "Usuario não encontrado", status: '404' })
                } else {
                    console.log("Alterado com sucesso", { id: userId, name: userName, email: userEmail })
                    resolve({ id: userId, name: userName, email: userEmail })
                }
            }
        })
    })
}

export const deleteUser = (email) => {
  return new Promise ((resolve, reject) =>{
    let sql = `DELETE FROM users WHERE email = ?`
    let params = [email]
    instanceDB.run (sql, params, function(err){
      if(err){
        console.error("Algo deu errado", err.message)
        reject(err)
      } else {
        if(this.changes === 0){
          resolve({message: "Usuario não encontrado", status: '404'})
        } else {
          console.log("Deletado com sucesso", {message: "Usuario Deletado", status: "204"})
          resolve({message: "Usuario Deletado", status: "204"})
        }
      }
    })
  })
}

// deleteUser("@gmail.com")
// Funções de teste
// updateUser(7, " ", "@live.com" ) 

// insertUser(" ", "@gmail.com", "123456")
// searchAllUsers()
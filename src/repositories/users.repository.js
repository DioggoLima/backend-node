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

//Busca usuário por email

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

// insertUser("Naira", "naira@gmail.com", "123456")
// searchAllUsers()
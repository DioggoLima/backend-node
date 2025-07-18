import instanceDB from "../infra/connectDB.js";

export const searchAllProducts = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM products`;

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

export const searchProductByName = (searchName) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM products WHERE name LIKE '%${searchName}%'`
        instanceDB.all(sql, [], (err, row) => {
            if (err) {
                console.error('[ERROR] verifique a implementação', err)
                reject(err)
            } else {
                console.log(row)
                resolve(row)
            }
        })
    })
}

export const searchProductById = (productId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM products WHERE products.id = ${productId}`
        instanceDB.get(sql, [], (error, row) => {
            if (error) {
                console.error(error.message)
                reject(error)
            } else {
                console.log(row)
                resolve(row)
            }
        })
    })
}

export const insertProduct = (name, description, price, stock) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO products(name, description, price, stock)
                    VALUES (?, ?, ?, ?)`
        let params = [name, description, price, stock]

        instanceDB.run(sql, params, (error) => {
            if (error) {
                console.error(error.message)
                reject(error)
            } else {
                let sql = `SELECT last_insert_rowId() as id`
                instanceDB.get(sql, [], (error, row) => {
                    if (error) {
                        console.log(error.message)
                        reject(error)
                    } else {
                        console.log(`O id do produto inserido foi ${row.id}`)
                        resolve({
                            "id": row.id,
                            "name": name,
                            "description": description,
                            "price": price,
                            "stock": stock
                        })
                    }
                })
            }
        })
    })
}

export const updateProduct = (productId, productName, productDescription, productPrice, productStock) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?`;
        let params = [productName, productDescription, productPrice, productStock, productId]
        instanceDB.run(sql, params, function (err) {
            if (err) {
                console.error("Algo deu errado", err.message)
                reject(err)
            } else {
                if (this.changes === 0) {
                    resolve({ message: "Usuario não encontrado", status: '404' })
                } else {
                    console.log("Alterado com sucesso", {id: productId, name: productName, description: productDescription, price: productPrice, stock: productStock})
                    resolve({id: productId, name: productName, description: productDescription, price: productPrice, stock: productStock})
                }
            }
        })
    })
}

export const deleteProduct = (id) => {
  return new Promise ((resolve, reject) =>{
    let sql = `DELETE FROM products WHERE id = ?`
    let params = [id]
    instanceDB.run (sql, params, function(err){
      if(err){
        console.error("Algo deu errado", err.message)
        reject(err)
      } else {
        if(this.changes === 0){
          resolve({message: "Produto não encontrado", status: '404'})
        } else {
          console.log("Deletado com sucesso", {message: "Produto Deletado", status: "204"})
          resolve({message: "Usuario Deletado", status: "204"})
        }
      }
    })
  })
}

// deleteProduct(6)
// updateProduct(6, "Impressora", "HP Smart Tank", "1.900", "5")
// searchAllProducts()
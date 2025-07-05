import instanceDB from "../infra/connectDB.js";

const searchAllAddresses = ()=>{
    return new Promise((resolve, reject)=>{
        let sql = `SELECT * FROM addresses`;

        instanceDB.all(sql, [], (err, row)=>{
            if (err) {
                console.error(err.message)
                reject(err)
            } else{
                console.log(row)
                resolve(row)
            }
        })
    })
}

const searchAddressesById = (addressesId)=>{
    return new Promise((resolve, reject)=>{
        let sql = `SELECT * FROM addresses WHERE addresses.id = ${addressesId}`
        instanceDB.get(sql, [], (error, row)=>{
            if (error){
                console.log(error.message)
                reject(error)
            } else {
                console.log(row)
                resolve(row)
            }
        })
    })
}

// searchAllAddresses()
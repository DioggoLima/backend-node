import bcrypt from "bcryptjs";

export const hashPassword = (plainPassword)=>{
    let saltRounds = 10;
    return new Promise((resolve, reject)=>{
        bcrypt.hash(plainPassword, saltRounds, (err, hash)=>{
            if(err) {
                console.error(err.message)
                reject(err)
            } else {
                console.log(hash)
                resolve(hash)
            }
        })
    })
}

export const comparePassword = (plainPassword, passwordHashed)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.compare(plainPassword, passwordHashed, (err, isMatch)=>{
            if(err){
                console.error(err.message)
                reject(err)
            } else {
                console.log(isMatch)
                resolve(isMatch)
            }
        })
    })
}

// let secret = hashPassword("123456").then((hash)=>{
//     comparePassword("123456", hash)
// })

// console.log(typeof(secret))
// comparePassword("123456", secret)
import instanceDB from "../connectDB.js";

instanceDB.serialize(()=>{
    instanceDB.run(
        `
        CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        `
    )

    instanceDB.run(
        `
        CREATE TABLE IF NOT EXISTS addresses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        street TEXT(200) NOT NULL,
        city TEXT(200) NOT NULL,
        state TEXT(100) NOT NULL,
        zipcode TEXT(9) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        `
    )

    instanceDB.run(
        `
        CREATE TABLE IF NOT EXISTS products(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT(150) NOT NULL,
        description TEXT(250) NOT NULL,
        price REAL NOT NULL,
        stock INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        `
    )

    instanceDB.run(
        `
        CREATE TABLE IF NOT EXISTS shopping_kart(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        update_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id) 
        );
        `
    )
});

instanceDB.close((error)=>{
    if (error) throw error;
    console.log("Migrations execute success")
});
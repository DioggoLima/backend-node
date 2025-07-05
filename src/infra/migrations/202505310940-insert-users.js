import instanceDB from "../connectDB.js";

instanceDB.serialize(()=>{
    instanceDB.run(
        `
        INSERT INTO users (name, email, password)
        VALUES ('Diogo', 'dioggolima@live.com', '123456');

        `
    )

    instanceDB.run(
        `
        INSERT INTO users (name, email, password)
        VALUES ('Murilo', 'murilo@gmail.com', '234567');
        
        `
    )

    instanceDB.run(
        `
        INSERT INTO users (name, email, password)
        VALUES ('DaviLucas', 'davilucas@gmail.com', '345678');
        
        `
    )

    instanceDB.run(
        `
        INSERT INTO users (name, email, password)
        VALUES ('Pietro', 'pietro@gmail.com', '456789');
        
        `
    )
      
});

instanceDB.close((error)=>{
    if (error) throw error;
    console.log("Migrations users execute success")
});
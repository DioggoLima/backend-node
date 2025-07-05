import instanceDB from "../connectDB.js";

instanceDB.serialize(()=>{
    instanceDB.run(
        `
        INSERT INTO addresses (user_id, street, city, state, zipcode)
        VALUES ('1', 'Via Expressa', 'Jandira', 'SP', 00325425);

        `
    )

    instanceDB.run(
        `
        INSERT INTO addresses (user_id, street, city, state, zipcode)
        VALUES ('2', 'Av. Marques', 'São Paulo', 'SP', 00212548);
        
        `
    )

    instanceDB.run(
        `
        INSERT INTO addresses (user_id, street, city, state, zipcode)
        VALUES ('3', 'Rua Maririm', 'Itapevi', 'SP', 22014658);
        
        `
    )

    instanceDB.run(
        `
        INSERT INTO addresses (user_id, street, city, state, zipcode)
        VALUES ('4', 'Rua Crescencio', 'Jandira', 'SP', 00325251);
        
        `
    )
      
});

instanceDB.close((error)=>{
    if (error) throw error;
    console.log("Migrations addresses execute success")
});
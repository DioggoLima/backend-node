import instanceDB from "../connectDB.js";

instanceDB.serialize(()=>{
    instanceDB.run(
        `
        INSERT INTO shopping_kart (user_id, product_id, quantity)
        VALUES (1, 1, 3);
        `
    )

    instanceDB.run(
        `
        INSERT INTO shopping_kart (user_id, product_id, quantity)
        VALUES (1, 3, 1);
        `
    )

    instanceDB.run(
        `
        INSERT INTO shopping_kart (user_id, product_id, quantity)
        VALUES (2, 2, 3);
        
        `
    )

    instanceDB.run(
        `
        INSERT INTO shopping_kart (user_id, product_id, quantity)
        VALUES (3, 4, 1);
        
        `
    )

    instanceDB.run(
        `
        INSERT INTO shopping_kart (user_id, product_id, quantity)
        VALUES (4, 5, 1);
        
        `
    )
      
});

instanceDB.close((error)=>{
    if (error) throw error;
    console.log("Migrations shopping_kart execute success")
});
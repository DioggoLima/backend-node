import instanceDB from "../connectDB.js";

instanceDB.serialize(()=>{
    instanceDB.run(
        `
        INSERT INTO products (name, description, price, stock)
        VALUES ('Celular', 'Smartphone', 5.400, 50);

        `
    )

    instanceDB.run(
        `
        INSERT INTO products (name, description, price, stock)
        VALUES ('Televisão', 'SmartTv8K', 7.000, 27);

        `
    )

    instanceDB.run(
        `
        INSERT INTO products (name, description, price, stock)
        VALUES ('Notebook', 'NotebookI9', 9.400, 14);

        `
    )

    instanceDB.run(
        `
        INSERT INTO products (name, description, price, stock)
        VALUES ('Caixa de Som', 'Jbl Boombox', 2.500, 23);

        `
    )

    instanceDB.run(
        `
        INSERT INTO products (name, description, price, stock)
        VALUES ('Play Station V', 'Video Game', 4.100, 13);

        `
    )

});

instanceDB.close((error)=>{
    if (error) throw error;
    console.log("Migrations products execute success")
});
import sqlite3 from 'sqlite3';
import path from "path";

const dbPath = path.resolve(process.cwd(), 'src/infra/database/marketplace.db');

const instanceDB = new sqlite3.Database(dbPath, (error)=>{
    if (error) throw error;

    console.log("Connect Database was success!!!")
})

export default instanceDB;
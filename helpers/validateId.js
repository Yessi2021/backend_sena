const db = require('../config/db');

// recibe la tabla y el id a validar si existe en la tabla
const checkIfRecordExists =  async (table, id) => {

    const [results] =  await db.query(`SELECT 1 FROM ${table} WHERE ID = ? LIMIT 1`,[id])
    console.log(results);
    return results.length > 0;

}


module.exports = {
    checkIfRecordExists
};
const db = require('../db');

const GetAllClients = async (req, res) => {
  let query = `
    SELECT * FROM cliente
  `
  
  db.query(query, async (err, result) => {
    
    const pedidosFormatados = result.map((row) => ({
      id: row.id_cliente,
      name: row.nm_cliente,
      email: row.email_cliente,
      rua: row.nm_rua,
      bairro: row.bairro,
      cidade: row.cidade,
      residencia: row.num_residencia
    }));

    res.status(200).json(pedidosFormatados)
  })
}

module.exports = {GetAllClients}
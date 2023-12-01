const db = require('../db')

const addPizza = async (req, res) => {
  try {
    const { nome, ingredientes, descricao, valor } = req.body;
    const url_pizza = req.file.filename; 

    const insertPizzaQuery = `
      INSERT INTO pizzas
      (nm_pizza, ingredientes, descricao, vl_pizza, url_pizza)
      VALUES
      (?, ?, ?, ?, ?)
    `;

    await db.query(insertPizzaQuery, [nome, ingredientes, descricao, valor, url_pizza]);
    
    return res.status(200).json('Pizza adicionada com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar pizza:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const addProduct = async (req, res) => {
  try {
    const { nome, descricao, valor } = req.body;
    const url_produto = req.file.filename; 
    const insertProductQuery = `
      INSERT INTO produtos
      (nm_produto, descricao, vl_produto, url_produto)
      VALUES
      (?, ?, ?, ?)
    `;

    await db.query(insertProductQuery, [nome, descricao, valor, url_produto]);
    
    return res.status(200).json('Produto adicionado com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { addPizza, addProduct };
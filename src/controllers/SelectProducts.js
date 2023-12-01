const db = require('../db')

const SelectedPizza = async (req, res) => {
  let query = `
    SELECT * FROM pizzas
  `;

  db.query(query, async (err, result) => {
    if (err) {
      res.status(400).json({ Message: err })
      return
    }
    console.log(result)
    if (!result) {
        res.status(404).json('Não existe pizza.')
        return
    }

    const pizzas = result.map(item => ({
      "id_pizza": item.id_pizza,
      "nm_pizza": item.nm_pizza,
      "vl_pizza": item.vl_pizza,
      "ingredientes": item.ingredientes,
      "descricao": item.descricao,
      "url_pizza": item.url_pizza
      })
    );

    return res.status(200).json(pizzas)
  })
}

const SelectedProdutos = async (req, res) => {
  let query = `
  SELECT * FROM produtos
`;

db.query(query, async (err, result) => {
  if (err) {
    res.status(400).json({ Message: error })
    return
  }

  if (!result) {
      res.status(401).json('Não existe produtos.')
      return
  }

  const produtos = result.map(item => ({
    "id_produto": item.id_produto,
    "nm_produto": item.nm_produto,
    "vl_produto": item.vl_produto,
    "url_produto": item.url_produto,
    "descricao": item.descricao
    })
  );

  return res.status(200).json(produtos)
})
}

module.exports = {
  SelectedPizza,
  SelectedProdutos
}
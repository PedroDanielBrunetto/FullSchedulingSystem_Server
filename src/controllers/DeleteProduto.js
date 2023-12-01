const db = require('../db');

const DeleteProduto = (req, res) => {
  const id_produto = req.params.id;

  const deletePedidoItemQuery = `
    DELETE FROM pedido_item WHERE id_pizza = ?
  `;

  db.query(deletePedidoItemQuery, [id_produto], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json('Erro interno do servidor');
    }

    const deletePizzaQuery = `
      DELETE FROM pizzas WHERE id_pizza = ?
    `;

    db.query(deletePizzaQuery, [id_produto], async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json('Erro interno do servidor');
      }

      return res.status(200).json('Excluído');
    });
  });
};

module.exports = { DeleteProduto };
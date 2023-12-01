const db = require('../db');

const DeleteCliente = (req, res) => {
  const id_cliente = req.params.id;

  const deleteNotClientQuery = `
    DELETE FROM notClient WHERE id_pedido IN (SELECT id_pedido FROM pedido WHERE id_cliente = ?)
  `;

  db.query(deleteNotClientQuery, [id_cliente], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json('Erro interno do servidor');
    }

    const deletePedidoQuery = `
      DELETE FROM pedido WHERE id_cliente = ?
    `;

    db.query(deletePedidoQuery, [id_cliente], async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json('Erro interno do servidor');
      }

      const deleteClienteQuery = `
        DELETE FROM cliente WHERE id_cliente = ?
      `;

      db.query(deleteClienteQuery, [id_cliente], async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json('Erro interno do servidor');
        }

        return res.status(200).json('Cliente excluído com sucesso');
      });
    });
  });
};

module.exports = { DeleteCliente };

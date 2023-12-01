const db = require('../db');

const SelectedPedidos = async (req, res) => {
  try {
    const query = `
    SELECT
      ped.id_pedido 'idPedido',
      cli.nm_cliente 'nmCliente',
      cli.celular 'celCliente',
      cli.nm_rua 'ruaCliente',
      cli.num_residencia 'resCliente',
      cli.bairro 'bairroCliente',
      piz.nm_pizza 'pizza',
      pro.nm_produto 'produto',
      piz.vl_pizza 'valor',
      item.quantidade 'quantidade'
    FROM pedido ped
    INNER JOIN cliente cli ON cli.id_cliente = ped.id_cliente
    INNER JOIN pedido_item item ON item.id_pedido = ped.id_pedido
    INNER JOIN pizzas piz ON piz.id_pizza = item.id_pizza
    INNER JOIN produtos pro ON pro.id_produto = item.id_produto;
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }

      const pedidosFormatados = results.map((row) => ({
        idPedido: row.idPedido,
        nmCliente: row.nmCliente,
        celCliente: row.celCliente,
        ruaCliente: row.ruaCliente,
        resCliente: row.resCliente,
        bairroCliente: row.bairroCliente,
        items: [
          {
            pizza: row.pizza,
            produto: row.produto,
            valor: row.valor,
            quantidade: row.quantidade,
          },
        ],
      }));

      console.log(pedidosFormatados)
      res.status(200).json(pedidosFormatados);
    });
  } catch (error) {
    console.error('Erro ao realizar o pedido:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {SelectedPedidos};

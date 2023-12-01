const db = require('../db')

const CreatePedido = async (req, res) => {
  try {
    const { pedidoItens, tipoPagamento, idCliente } = req.body;
    console.log(pedidoItens, tipoPagamento, idCliente)
    const insertPedidoQuery = `
      INSERT INTO pedido (id_cliente, status_pedido, tipo_pagamento)
      VALUES (?, ?, ?)
    `;

    await db.query(insertPedidoQuery, [idCliente, 0, tipoPagamento]);
    
    const getLastId = `
      Select id_pedido From pedido order by id_pedido desc
    `

    db.query(getLastId, async (err, result) =>{

      const pedidoId = result[0].id_pedido;
      console.log(pedidoId)
      
      const insertPedidoItemQuery = `
      INSERT INTO pedido_item (id_pedido, id_pizza, id_produto, quantidade)
      VALUES (?, ?, ?, ?)
      `;
      
      for (const pedidoItem of pedidoItens) {
        await db.query(insertPedidoItemQuery, [pedidoId, pedidoItem.id, pedidoItem.id, pedidoItem.quantidade]);
      }
      
      res.status(200).json({ message: 'Pedido realizado com sucesso!' });
    })
  } catch (error) {
    console.error('Erro ao realizar o pedido:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  CreatePedido
};

module.exports = {
  CreatePedido
}
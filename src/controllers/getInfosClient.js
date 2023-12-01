const express = require('express');
const db = require('../db');

const GetInfosClient = (req, res) => {
  const id = req.params.id
  
  try {
    let query = `
      SELECT * FROM cliente WHERE id_cliente = ?
    `;

    db.query(query, [id], async (err, result) => {
      if (err) {
        res.status(400).json({ Message: err })
        return
      }
      if (result.length === 0) {
          res.status(401).json('Não existe usuário com esse id!')
          return
      }

      const {
        id_cliente,
        nm_cliente,
        email_cliente,
        celular,
        cpf_cliente,
        pw_cliente,
        cd_cep,
        nm_rua,
        bairro,
        cidade,
        num_residencia,
        complemento,
        id_uf
    } = result[0];

    const responseData = {
        id_cliente,
        nm_cliente,
        email_cliente,
        celular,
        cpf_cliente,
        pw_cliente,
        cd_cep,
        nm_rua,
        bairro,
        cidade,
        num_residencia,
        complemento,
        id_uf
    };

    return res.status(200).json(responseData);

    })
  } catch (error) {
    return res.status(500).json(error)
  }
};

module.exports = {
  GetInfosClient
}
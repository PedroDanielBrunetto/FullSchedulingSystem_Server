const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

const saltRounds = 10;

const RegisterClient = async (req, res) => {
  try {
    const { name, email, cpf, cep, street, number, neighborhood, city, state, password, phone } = req.body;

    const select = `
      SELECT email_cliente, cpf_cliente FROM cliente WHERE email_cliente = ? OR cpf_cliente = ?
    `;
    
    db.query(select, [email, cpf], async (err, result) => {
      if (err) {
        res.status(400).json({ Message: error })
        return
      }
      if (result.length > 0) {
        res.status(422).json('Essa conta já existe.')
        console.log(result)
        return
      }
        
        // Hash da senha usando bcrypt
        if (!password) {
          return res.status(400).json({ error: 'A senha não foi fornecida' });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Inserir cliente no banco de dados
    const insertClienteQuery = `
    INSERT INTO cliente
    (nm_cliente, email_cliente, cpf_cliente, cd_cep, nm_rua, bairro, cidade, id_uf, pw_cliente, num_residencia, celular)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
   await db.query(insertClienteQuery, [
      name, email, cpf, cep, street, neighborhood, city, state, hashedPassword, number, phone
    ]);
    return res.status(200).json("Sucess!")
  })
  } catch (error) {
    console.error('Erro no registro do cliente:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = RegisterClient;
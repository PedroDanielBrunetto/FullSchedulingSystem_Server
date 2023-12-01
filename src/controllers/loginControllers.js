const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const LoginController = async (req, res) => {
    const {email, password} = req.body;

    try {
        let query = `
            SELECT nm_cliente, id_cliente, email_cliente, pw_cliente FROM cliente WHERE email_cliente = ?
        `;

        db.query(query, [email], async (err, result) => {
            if (err) {
                res.status(400).json({ Message: error })
                return
            }
            if (result.length === 0) {
                res.status(401).json('Email ou senha incorretos!')
                return
            }

            const storedHashedPassword = result[0].pw_cliente;
            const storedIdCliente = result[0].id_cliente;
            const storedName = result[0].nm_cliente;

            const pw = await bcrypt.compare(password, storedHashedPassword)
            console.log(pw)

            if (!pw){
                res.status(401).json("Email ou senha incorretos!")
                return
            }
                res.status(200).json({
                    'id': storedIdCliente,
                    'nome': storedName
                })
        });
    } catch (error) {
        res.status(500).json(error)
    }
};

module.exports = {
    LoginController
}
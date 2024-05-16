const express = require('express');
const db = require('../Infra');

const LoginController = async (req, res) => {
    const {emailCpf, password} = req.body;

    try {
        let query = `
            SELECT true FROM MainUser WHERE (email_user = ? OR cpf_user = ?) AND password_user = ? 
        `;

        db.query(query, [emailCpf, emailCpf, password], async (err, result) => {
            if (err) {
                res.status(400).json({ Message: error })
                return
            }
            if (result.length === 0) {
                res.status(401).json('Email ou senha incorretos!')
                return
            }

            // const pw = await bcrypt.compare(password, storedHashedPassword)
            // console.log(pw)

            res.status(200).json({
                'acesso': true
            })
        });
    } catch (error) {
        res.status(500).json(error)
    }
};

module.exports = {
    LoginController
}
const pool = require("../../Infra/mysql.js");
const bcrypt = require("bcrypt");

const LoginController = async (req, res) => {
  const { emailCpf, password } = req.body;

  try {
    let query = `
      SELECT password_user, id_user FROM MainUser WHERE email_user = ? OR cpf_user = ?;
    `;

    pool.query(query, [emailCpf, emailCpf], async (err, results) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Email ou senha incorretos!" });
      }

      const storedPassword = results[0].password_user;
      const storedId = results[0].id_user;

      const isPasswordMatch = await bcrypt.compare(password, storedPassword);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Email ou senha incorretos!" });
      }

      return res.status(200).json({
         acesso: true,
         idUser: storedId 
        });
    });
  } catch (error) {
    console.error("Erro ao processar login:", error);
    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação." });
  }
};

module.exports = {
  LoginController,
};

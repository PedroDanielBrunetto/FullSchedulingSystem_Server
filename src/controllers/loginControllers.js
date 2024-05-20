const pool = require("../Infra");

const LoginController = async (req, res) => {
  const { emailCpf, password } = req.body;

  try {
    let query = `
            SELECT true FROM MainUser WHERE (email_user = ? OR cpf_user = ?) AND password_user = ? 
        `;

    pool.query(query, [emailCpf, emailCpf, password], async (err, result) => {
      if (err) {
        res.status(400).json({ Message: error });
        return;
      }
      if (result.length === 0) {
        res.status(401).json("Email ou senha incorretos!");
        return;
      }

      res.status(200).json({
        acesso: true,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  LoginController,
};

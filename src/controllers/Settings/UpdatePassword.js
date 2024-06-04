const pool = require("../../Infra/mysql2");
const bcrypt = require("bcrypt");

const UpdatePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios.",
      });
    }

    const queryGetUser = `SELECT password_user FROM MainUser WHERE id_user = ?;`;

    pool.query(queryGetUser, [userId], async (error, results) => {
      if (error) {
        throw error;
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      const storedPassword = results[0].password_user;

      const isPasswordMatch = await bcrypt.compare(currentPassword, storedPassword);
      if (!isPasswordMatch) {
        return res.status(401).json({
          success: false,
          message: "Senha atual incorreta.",
        });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      const queryUpdatePassword = `
        UPDATE MainUser
        SET password_user = ?
        WHERE id_user = ?;
      `;

      pool.query(queryUpdatePassword, [hashedNewPassword, userId], (error, results) => {
        if (error) {
          throw error;
        }

        return res.status(200).json({
          success: true,
          message: "Senha atualizada com sucesso.",
        });
      });
    });
  } catch (error) {
    console.error("Erro ao atualizar a senha:", error);
    return res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao processar sua solicitação.",
    });
  }
}

module.exports = {
  UpdatePassword,
}

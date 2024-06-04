const pool = require("../../Infra/mysql2");

const UpdateMessageSms = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "A mensagem é obrigatória.",
      });
    }

    // Substituir espaços por '+'
    const formattedMessage = message.split(' ').join('+');

    const query = `
      UPDATE settings
      SET Mensagem_enviada = ?
      WHERE id = 1;
    `;

    pool.query(query, [formattedMessage], (error, results) => {
      if (error) {
        throw error;
      }

      return res.status(200).json({
        success: true,
        message: "Mensagem atualizada com sucesso.",
      });
    });
  } catch (error) {
    console.error("Erro ao atualizar a mensagem:", error);
    return res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao processar sua solicitação.",
    });
  }
}

module.exports = {
  UpdateMessageSms,
}

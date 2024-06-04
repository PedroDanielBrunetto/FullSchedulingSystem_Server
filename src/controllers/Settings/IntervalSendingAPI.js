const pool = require("../../Infra/mysql2");

const IntervalSendingAPI = async (req, res) => {
  try {
    const { interval } = req.body;

    if (interval === undefined || interval === null) {
      return res.status(400).json({
        success: false,
        message: "O intervalo é obrigatório.",
      });
    }

    const query = `
      UPDATE settings
      SET sending_interval = ?
      WHERE id = 1;
    `;

    pool.query(query, [interval], (error, results) => {
      if (error) {
        throw error;
      }

      return res.status(200).json({
        success: true,
        message: "Intervalo atualizado com sucesso.",
      });
    });
  } catch (error) {
    console.error("Erro ao atualizar o intervalo:", error);
    return res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao processar sua solicitação.",
    });
  }
}

module.exports = {
  IntervalSendingAPI,
}

const pool = require("../../../Infra/mysql2");

const getSettings = async (req, res) => {
  try {
    const query = `
      SELECT * FROM settings WHERE id = 1;
    `;

    pool.query(query, (error, results) => {
      if (error) {
        throw error;
      }

      return res.status(200).json({
        success: true,
        settings: results[0],
      });
    });
  } catch (error) {
    console.error("Erro ao buscar as configurações:", error);
    return res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao processar sua solicitação.",
    });
  }
};

module.exports = {
  getSettings,
};

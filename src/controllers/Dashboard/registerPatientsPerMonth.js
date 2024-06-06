const pool = require("../../Infra/mysql2");

const registerPatientsPerMonth = async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM CadastrosPorMes;
    `;
    pool.query(query, (error, results) => {
      if (error) {
        console.error("Erro ao recuperar o número de cadastros de pacientes por mês:", error);
        return res.status(500).json({
          success: false,
          message: "Erro ao recuperar o número de cadastros de pacientes por mês.",
        });
      }
      const cadastrosPorMes = results;
      return res.status(200).json({
        success: true,
        cadastrosPorMes,
      });
    });
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao processar a solicitação.",
    });
  }
};

module.exports = {
  registerPatientsPerMonth,
};

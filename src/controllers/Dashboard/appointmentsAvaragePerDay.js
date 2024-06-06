const pool = require("../../Infra/mysql2");

const appointmentsAvaragePerDay = async (req, res) => {
  try {
    const query = `
      SELECT AVG(Consultas) AS MediaConsultasPorDia
      FROM ConsultasPorDia;
    `;
    pool.query(query, (error, results) => {
      if (error) {
        console.error("Erro ao recuperar a média de consultas por dia:", error);
        return res.status(500).json({
          success: false,
          message: "Erro ao recuperar a média de consultas por dia.",
        });
      }
      const mediaConsultasPorDia = results[0].MediaConsultasPorDia;
      return res.status(200).json({
        success: true,
        mediaConsultasPorDia,
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
  appointmentsAvaragePerDay,
};

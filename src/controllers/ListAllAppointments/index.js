const pool = require("../../Infra/mysql2");

const getAppointmentsByDay = async (req, res) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "A data é obrigatória.",
      });
    }

    const query = `
      SELECT * FROM AllAppointments
      WHERE DATE(initial) = ?;
    `;

    pool.query(query, [date], (error, results) => {
      if (error) {
        throw error;
      }

      return res.status(200).json({
        success: true,
        appointments: results,
      });
    });
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
    return res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao processar sua solicitação.",
    });
  }
};

module.exports = {
  getAppointmentsByDay,
};

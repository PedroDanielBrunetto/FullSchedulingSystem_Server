const pool = require("../../Infra/mysql2");

// Função para converter datas
const formatDateForSQL = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};

const getAppointmentsByDay = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "A data é obrigatória.",
      });
    }

    const formattedDate = formatDateForSQL(date);

    const query = `
      SELECT * FROM AllAppointments
      WHERE DATE(initial) = ?;
    `;

    pool.query(query, [formattedDate], (error, results) => {
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
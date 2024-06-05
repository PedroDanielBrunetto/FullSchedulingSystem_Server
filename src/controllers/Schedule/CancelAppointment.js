const pool = require("../../Infra/mysql2.js").promise();

const CancelAppointment = async (req, res) => {
  try {
    const { id_scheduling, identify } = req.body;

    if (!id_scheduling) {
      return res.status(400).json({
        success: false,
        message: "O ID do agendamento é obrigatório.",
      });
    }

    let deleteAppointmentQuery = null;

    if (identify === 1) {
      deleteAppointmentQuery = `
        DELETE FROM agenda WHERE id_scheduling = ?;
      `;
    } else {
      deleteAppointmentQuery = `
        DELETE FROM agendaNotRegistered WHERE id = ?;
      `;
    }

    await pool.query(deleteAppointmentQuery, [id_scheduling]);

    return res.status(200).json({
      success: true,
      message: "Agendamento cancelado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error);
    return res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao processar sua solicitação.",
    });
  }
};

module.exports = {
  CancelAppointment,
};

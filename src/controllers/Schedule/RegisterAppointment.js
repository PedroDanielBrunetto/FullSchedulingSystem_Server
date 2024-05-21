const pool = require("../../Infra/mysql2");

// Função para converter datas
const formatDate = (dateString) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/");
  return `${year}-${month}-${day} ${timePart}:00`;
};

const RegisterAppointment = async (req, res) => {
  try {
    const { cpf, dateInitial, dateFinal, message } = req.body;

    if (!cpf || !dateInitial || !dateFinal) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos obrigatórios devem ser preenchidos.",
      });
    }

    const formattedDateInitial = formatDate(dateInitial);
    const formattedDateFinal = formatDate(dateFinal);

    const checkExistingPatient = `
      SELECT id_patient, first_name, second_name FROM patient WHERE cpf_patient = ?;
    `;

    const checkConsultBetween = `
      SELECT * FROM agenda 
      WHERE (initial <= ? AND final >= ?) OR (initial <= ? AND final >= ?) OR (initial >= ? AND final <= ?);
    `;

    pool.query(
      checkConsultBetween,
      [
        formattedDateInitial,
        formattedDateInitial,
        formattedDateFinal,
        formattedDateFinal,
        formattedDateInitial,
        formattedDateFinal,
      ],
      (error, consultExistResults) => {
        if (error) {
          throw error;
        }

        const consultExist = consultExistResults;

        if (consultExist.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Já existe uma consulta agendada para esse horário.",
          });
        }

        pool.query(checkExistingPatient, [cpf], (error, patientResults) => {
          if (error) {
            throw error;
          }

          const patient = patientResults;

          if (patient.length === 0) {
            return res.status(404).json({
              success: false,
              message: "Paciente não encontrado.",
            });
          }

          const insertAppointment = `
          INSERT INTO agenda (display_name, initial, final, message, id_patient)
          VALUES (?, ?, ?, ?, ?);
        `;

          pool.query(
            insertAppointment,
            [
              `${patient[0].first_name} ${patient[0].second_name}`,
              formattedDateInitial,
              formattedDateFinal,
              message,
              patient[0].id_patient,
            ],
            (error, result) => {
              if (error) {
                throw error;
              }

              return res.status(201).json({
                success: true,
                message: "Consulta agendada com sucesso.",
              });
            }
          );
        });
      }
    );
  } catch (error) {
    console.error("Erro ao registrar paciente:", error);
    return res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao processar sua solicitação.",
    });
  }
};

module.exports = {
  RegisterAppointment,
};

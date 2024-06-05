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
      WHERE (initial < ? AND final > ?) OR 
            (initial < ? AND final > ?) OR 
            (initial >= ? AND final <= ?) OR 
            (initial = ? OR final = ?);
    `;

    const checkConsultBetweenNotRegister = `
      SELECT * FROM agendaNotRegistered 
      WHERE (initial < ? AND final > ?) OR 
            (initial < ? AND final > ?) OR 
            (initial >= ? AND final <= ?) OR 
            (initial = ? OR final = ?);
    `;

    const queryParams = [
      formattedDateInitial,
      formattedDateInitial,
      formattedDateFinal,
      formattedDateFinal,
      formattedDateInitial,
      formattedDateFinal,
      formattedDateInitial,
      formattedDateFinal,
      formattedDateInitial,
      formattedDateFinal
    ];

    pool.query(checkConsultBetween, queryParams, (error, consultExistResults) => {
      if (error) {
        throw error;
      }

      if (consultExistResults.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Já existe uma consulta agendada para esse horário.",
        });
      } else {
        pool.query(checkConsultBetweenNotRegister, queryParams, (error, consultExistResultsUnregister) => {
          if (error) {
            throw error;
          }

          if (consultExistResultsUnregister.length > 0) {
            return res.status(400).json({
              success: false,
              message: "Já existe uma consulta agendada para esse horário.",
            });
          } else {
            pool.query(checkExistingPatient, [cpf], (error, patientResults) => {
              if (error) {
                throw error;
              }

              if (patientResults.length === 0) {
                return res.status(400).json({
                  success: false,
                  message: "Paciente não encontrado.",
                });
              }

              const patient = patientResults[0];

              const insertAppointment = `
                INSERT INTO agenda (display_name, initial, final, message, id_patient)
                VALUES (?, ?, ?, ?, ?);
              `;

              pool.query(
                insertAppointment,
                [
                  `${patient.first_name} ${patient.second_name}`,
                  formattedDateInitial,
                  formattedDateFinal,
                  message,
                  patient.id_patient,
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
        });
      }
    });
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

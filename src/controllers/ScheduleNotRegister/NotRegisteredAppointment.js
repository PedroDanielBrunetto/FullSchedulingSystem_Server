const pool = require("../../Infra/mysql2");

// Função para converter datas
const formatDate = (dateString) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/");
  return `${year}-${month}-${day} ${timePart}:00`;
};

const NotRegisteredAppointment = async (req, res) => {
  try {
    const { name, cel, dateInitial, dateFinal, message } = req.body;

    if (!name || !dateInitial || !dateFinal) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos obrigatórios devem ser preenchidos.",
      });
    }

    const formattedDateInitial = formatDate(dateInitial);
    const formattedDateFinal = formatDate(dateFinal);

    const checkConsultBetween = `
      SELECT * FROM agenda 
      WHERE (initial < ? AND final > ?) OR 
            (initial < ? AND final > ?) OR 
            (initial >= ? AND final <= ?) OR 
            (initial = ? OR final = ?) OR 
            (initial = ? OR final = ?);
    `;

    const checkConsultBetweenNotRegister = `
      SELECT * FROM agendaNotRegistered 
      WHERE (initial < ? AND final > ?) OR 
            (initial < ? AND final > ?) OR 
            (initial >= ? AND final <= ?) OR 
            (initial = ? OR final = ?) OR 
            (initial = ? OR final = ?);
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
        } else {
          pool.query(
            checkConsultBetweenNotRegister,
            [
              formattedDateInitial,
              formattedDateInitial,
              formattedDateFinal,
              formattedDateFinal,
              formattedDateInitial,
              formattedDateFinal,
            ],
            (error, consultExistResultsUnregister) => {
              if (error) {
                throw error;
              }

              const consultExistUnregister = consultExistResultsUnregister;

              if (consultExistUnregister.length > 0) {
                return res.status(400).json({
                  success: false,
                  message: "Já existe uma consulta agendada para esse horário.",
                });
              } else {
                const insertAppointment = `
                  INSERT INTO agendaNotRegistered (name_patient, cel_patient, initial, final, message)
                  VALUES (?, ?, ?, ?, ?);
                `;

                pool.query(
                  insertAppointment,
                  [
                    name,
                    cel,
                    formattedDateInitial,
                    formattedDateFinal,
                    message,
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
              }
            }
          );
        }
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
  NotRegisteredAppointment,
};

const pool = require("../Infra");

const UpdatePatient = async (req, res) => {
  try {
    const {
      cpf_patient,
      cep_patient,
      email_patient,
      cel_patient,
      about_patient,
    } = req.body;

    // Verifica se o CPF do paciente foi fornecido
    if (!cpf_patient) {
      return res.status(400).json({
        success: false,
        message: "É necessário fornecer o CPF do paciente.",
      });
    }

    let updateFields = [];
    let updateValues = [];

    // Verifica quais campos foram fornecidos para atualização e os adiciona aos arrays de campos e valores
    if (cep_patient !== undefined) {
      updateFields.push("cep_patient = ?");
      updateValues.push(cep_patient);
    }
    if (email_patient !== undefined) {
      updateFields.push("email_patient = ?");
      updateValues.push(email_patient);
    }
    if (cel_patient !== undefined) {
      updateFields.push("cel_patient = ?");
      updateValues.push(cel_patient);
    }
    if (about_patient !== undefined) {
      updateFields.push("about_patient = ?");
      updateValues.push(about_patient);
    }

    // Verifica se pelo menos um campo válido foi fornecido para atualização
    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nenhum campo válido fornecido para atualização.",
      });
    }

    // Monta a query de atualização
    const updateQuery = `
      UPDATE patient
      SET ${updateFields.join(", ")}
      WHERE cpf_patient = ?
    `;

    // Adiciona o CPF do paciente aos valores da query
    updateValues.push(cpf_patient);

    // Executa a query de atualização no banco de dados
    await pool.query(updateQuery, updateValues);

    return res.status(200).json({
      success: true,
      message: "Dados do paciente atualizados com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao atualizar dados do paciente:", error);
    return res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao atualizar dados do paciente.",
    });
  }
};

module.exports = { UpdatePatient };

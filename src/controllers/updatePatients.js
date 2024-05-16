const db = require('../Infra');

const UpdatePatient = async (req) => {
  try {
    const { cpf, cep, email, phone, obs } = req.body;

    if (!cpf) {
      return { success: false, message: "É necessário fornecer o CPF do paciente." };
    }

    let updateFields = [];
    let updateValues = [];

    const fieldsToUpdate = ['cep_patient', 'email_patient', 'cel_patient', 'about_patient'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        updateValues.push(req.body[field]);
      }
    });

    if (updateFields.length === 0) {
      return { success: false, message: "Nenhum campo válido fornecido para atualização." };
    }

    const updateQuery = `
      UPDATE patient
      SET ${updateFields.join(', ')}
      WHERE cpf_patient = ?
    `;

    updateValues.push(cpf);

    await db.query(updateQuery, updateValues);

    return { success: true, message: "Dados do paciente atualizados com sucesso." };
  } catch (error) {
    console.error("Erro ao atualizar dados do paciente:", error);
    return { success: false, message: "Ocorreu um erro ao atualizar dados do paciente." };
  }
};

module.exports = UpdatePatient;

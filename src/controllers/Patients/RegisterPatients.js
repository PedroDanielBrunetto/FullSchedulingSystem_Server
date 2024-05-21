const pool = require("../../Infra/mysql.js");

const RegisterPatients = async (req, res) => {
  try {
    const { firstName, secondName, cpf, cep, email, cel, about } = req.body;

    if (!firstName || !secondName || !cpf || !cep) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos obrigatórios devem ser preenchidos.",
      });
    }

    if (!isValidCPF(cpf)) {
      return res.status(400).json({ success: false, message: "CPF inválido." });
    }

    const insertPatientQuery = `
      INSERT INTO patient (first_name, second_name, cpf_patient, cep_patient, email_patient, cel_patient, about_patient)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(insertPatientQuery, [
      firstName,
      secondName,
      cpf,
      cep,
      email,
      cel,
      about,
    ]);

    return res
      .status(201)
      .json({ success: true, message: "Paciente registrado com sucesso." });
  } catch (error) {
    console.error("Erro ao registrar paciente:", error);
    return res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao processar sua solicitação.",
    });
  }
};

function isValidCPF(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let digit1 = remainder > 9 ? 0 : remainder;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  let digit2 = remainder > 9 ? 0 : remainder;

  if (
    parseInt(cpf.charAt(9)) !== digit1 ||
    parseInt(cpf.charAt(10)) !== digit2
  ) {
    return false;
  }

  return true;
}

module.exports = {
  RegisterPatients,
};

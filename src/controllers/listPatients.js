const db = require('../Infra');

const ListPatients = async () => {
  try {
    const query = `SELECT * FROM patient`;

    const patients = await db.query(query);

    return { success: true, patients };
  } catch (error) {
    console.error("Erro ao listar pacientes:", error);
    return { success: false, message: "Ocorreu um erro ao listar pacientes." };
  }
};

module.exports = ListPatients;

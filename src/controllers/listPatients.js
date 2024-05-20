const pool = require("../Infra");

const ListPatients = async (res) => {
  try {
    const query = `SELECT * FROM patient`;

    const patients = await pool.query(query);

    return res.status(200).json({ success: true, patients });
  } catch (error) {
    console.error("Erro ao listar pacientes:", error);
    return res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao listar pacientes.",
    });
  }
};

module.exports = { ListPatients };

const pool = require("../../Infra/mysql.js");

const ListPatients = async (req, res) => {
  try {
    const query = `SELECT * FROM patient`;

    await pool.query(query, async (err, result) => {
      if (err) {
        res.status(400).json({ Message: err.message }); // Corrigido de 'error' para 'err'
        return;
      }
      if (result.length === 0) {
        res.status(200).json("Não há pacientes encontrados.");
        return;
      }

      return res.status(200).json({ success: true, result });
    });
  } catch (error) {
    console.error("Erro ao listar pacientes:", error);
    return res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao listar pacientes.",
    });
  }
};

module.exports = { ListPatients };

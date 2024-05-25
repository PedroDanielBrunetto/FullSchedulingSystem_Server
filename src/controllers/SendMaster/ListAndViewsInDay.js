const pool = require("../../Infra/mysql2.js").promise();
const axios = require('axios');
const moment = require('moment-timezone');

const ListAndViewsInDay = async (req, res) => {
  try {
    // Data atual no fuso horário de São Paulo (Brasília)
    const today = moment.tz("America/Sao_Paulo").format('YYYY-MM-DD');

    const query = `
      SELECT a.id_scheduling, a.initial, p.cel_patient, s.Mensagem_enviada, s.sending_interval
      FROM agenda a
      JOIN patient p ON a.id_patient = p.id_patient
      JOIN settings s ON s.id = 1
      WHERE DATE(a.initial) = ?
    `;

    const [rows] = await pool.query(query, [today]);

    if (rows.length === 0) {
      if (res) {
        return res.status(200).json({
          success: true,
          message: "Nenhuma consulta agendada para hoje.",
        });
      } else {
        console.log("Nenhuma consulta agendada para hoje.");
        return;
      }
    }

    const smsApi = process.env.SMS_API;
    const smsUser = process.env.SMS_USER;
    const smsPassword = process.env.SMS_PASSWORD;

    const smsPromises = rows.map(async (appointment) => {
      const { initial, cel_patient, Mensagem_enviada, sending_interval } = appointment;

      const consultaData = moment(initial).tz("America/Sao_Paulo");
      const dataFormatada = consultaData.format('DD/MM/YYYY');
      let horarioFormatado = consultaData.clone().format('HH:mm');
      let horarioFormatadoEnvio = consultaData.clone().subtract(sending_interval, 'hours').format('HH:mm:ss');

      const mensagemFinal = Mensagem_enviada
        .replace("@data", dataFormatada)
        .replace("@horario", horarioFormatado);

      const envioDataHora = `${dataFormatada}+${horarioFormatadoEnvio}`;

      const apiURL = `
        ${smsApi}&usuario=${smsUser}&senha=${smsPassword}&celular=${cel_patient}&mensagem=${mensagemFinal}&data=${envioDataHora}
      `;

      console.log(apiURL)

      try {
        await axios.get(apiURL.trim());
      } catch (error) {
        console.error(`Erro ao enviar SMS para ${cel_patient}:`, error);
      }
    });

    await Promise.all(smsPromises);

    if (res) {
      return res.status(200).json({
        success: true,
        message: "SMS programados para as consultas de hoje.",
      });
    }
  } catch (error) {
    console.error("Erro ao listar e enviar SMS para as consultas do dia:", error);
    if (res) {
      return res.status(500).json({
        success: false,
        message: "Ocorreu um erro ao processar sua solicitação.",
      });
    }
  }
};

module.exports = {
  ListAndViewsInDay,
};

const pool = require("../../Infra/mysql2.js").promise();
const axios = require("axios");
const moment = require("moment-timezone");

const ListAndViewsInDay = async () => {
  try {
    // Data atual no fuso horário de São Paulo (Brasília)
    const today = moment.tz("America/Sao_Paulo").format("YYYY-MM-DD");

    const query = `
      SELECT a.id_scheduling, a.initial, p.cel_patient, s.Mensagem_enviada, s.sending_interval
      FROM agenda a
      JOIN patient p ON a.id_patient = p.id_patient
      JOIN settings s ON s.id = 1
      WHERE DATE(a.initial) = ?
    `;

    const [rows] = await pool.query(query, [today]);

    if (rows.length === 0) {
      return {
        success: true,
        message: "Nenhuma consulta agendada para hoje.",
        results: [],
      };
    }

    const smsApi = process.env.SMS_API;
    const smsUser = process.env.SMS_USER;
    const smsPassword = process.env.SMS_PASSWORD;

    const results = [];

    const smsPromises = rows.map(async (appointment) => {
      const { initial, cel_patient, Mensagem_enviada, sending_interval } =
        appointment;

      const consultaData = new Date(initial);
      const dataFormatada = consultaData.format("DD/MM/YYYY");
      const horarioFormatado = consultaData.clone().format("HH:mm");
      const horarioFormatadoEnvio = consultaData
        .clone()
        .subtract(sending_interval, "hours")
        .format("HH:mm:ss");

      const mensagemFinal = Mensagem_enviada.replace(
        "@data",
        dataFormatada
      ).replace("@horario", horarioFormatado);

      const envioDataHora = `${dataFormatada}+${horarioFormatadoEnvio}`;

      const apiURL = `
        ${smsApi}&usuario=${smsUser}&senha=${smsPassword}&celular=${cel_patient}&mensagem=${mensagemFinal}&data=${envioDataHora}
      `.trim();

      try {
        const response = await axios.get(apiURL);
        results.push({
          cel_patient,
          status: response.status,
          statusText: response.statusText,
          data: response.data,
        });
      } catch (error) {
        if (error.response) {
          results.push({
            cel_patient,
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
          });
        } else if (error.request) {
          results.push({
            cel_patient,
            status: "No response",
            statusText: "No response from API",
            data: error.request,
          });
        } else {
          results.push({
            cel_patient,
            status: "Error",
            statusText: error.message,
            data: null,
          });
        }
      }
    });

    await Promise.all(smsPromises);

    return {
      success: true,
      message: "SMS programados para as consultas de hoje.",
      results,
    };
  } catch (error) {
    console.error(
      "Erro ao listar e enviar SMS para as consultas do dia:",
      error.message || error
    );
    throw error;
  }
};

module.exports = {
  ListAndViewsInDay,
};

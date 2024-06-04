const axios = require("axios");

const BalanceInquirySms = async (req, res) => {
  try {
    const smsCreditos = process.env.SMS_CREDITOS;
    const smsUser = process.env.SMS_USER;
    const smsPassword = process.env.SMS_PASSWORD;

    const apiURL = `${smsCreditos}&usuario=${smsUser}&senha=${smsPassword}`.trim();

    const response = await axios.get(apiURL);

    if (response.status === 200) {
      const saldo = response.data;
      return res.status(200).json({ success: true, saldo });
    } else {
      return res.status(500).json({ success: false, message: "Erro ao consultar saldo de SMS." });
    }
  } catch (error) {
    console.error("Erro ao consultar saldo de SMS:", error);
    return res.status(500).json({ success: false, message: "Erro ao consultar saldo de SMS." });
  }
};

module.exports = {
  BalanceInquirySms,
};

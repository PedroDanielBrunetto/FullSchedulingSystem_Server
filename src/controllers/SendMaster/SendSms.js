const axios = require("axios")
require('dotenv').config();

const SendSms = async (req, res) => {
  
  const api = `
    ${process.env.SMS_API}&usuario=${process.env.SMS_USER}&senha=${process.env.SMS_PASSWORD}&celular=51999999999mensagem=Testing+API+IagenteSMS&data=30/05/2024+06:00:00
  `;

  await fetch(api).then((response) => response.text()).then((text)=>{
    if(text === "OK"){
      res.status(200).send({
        sucess: true,
        message: "Mensagem enviada com sucesso!"
      })
    }
    else{
      res.status(400).send({sucess: false,
        message: "Erro ao enviar mensagem!",
        error: text
      })
    }
  })
};

module.exports = {
  SendSms
}
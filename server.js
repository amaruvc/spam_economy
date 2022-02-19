const express = require("express");
const enviar_email = require("./email.js");
const axios = require("axios");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.static("static"));

app.get("/email", async (req, res) => {
  try {
    const destinatarios = req.query.destinatario.split(",");
    const asunto = req.query.asunto;
    const contenido = req.query.contenido;

    await sendMail(destinatarios, asunto, contenido);

    res.send("Email enviado");
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

async function sendMail(destinatarios, asunto, contenido) {
  let datos = await axios.get("https://mindicador.cl/api");
  datos = await datos.data;

  const cuerpo = `
  ${contenido}
  <br>
  <hr>
  <br>
  <h3>¡Hola! Los indicadores económicos para hoy son:</h3>
  <ul>
  <li>El valor del Dólar el dìa de hoy es: ${datos.dolar.valor}</li>
  <li>El valor del Euro el día de hoy es: ${datos.euro.valor}</li>
  <li>El valor del UF el día de hoy es: ${datos.uf.valor}</li>
  <li>El valor del UTM el día de hoy es: ${datos.utm.valor}</li>
  </uL>`;

  let message = {
    from: "Spam Economy Spa <mbensan.test@gmail.com>",
    to: destinatarios,
    subject: `Spam Economy Spa ${asunto}`,
    text: cuerpo,
    html: cuerpo,
  };

  await enviar_email(message);
  fs.writeFile(
    `correos/${uuid()}.txt`,
    JSON.stringify(message),
    "utf8",
    (err) => {
      if (err) {
        throw err;
      }
      console.log("archivo guardado");
    }
  );
}

app.listen(3000, () => {
  console.log("servidor ejecutando");
});

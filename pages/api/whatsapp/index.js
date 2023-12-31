import { NextRequest, NextResponse } from 'next/server';
const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')



// export default function message(req,res) {
//   if(req.method === 'POST') {

//     // res.send(whatsappClient.sendMessage({body: req.message,phoneNumber: req.phoneNumber})) 
//     whatsappClient.sendMessage({body: req.message,phoneNumber: req.phoneNumber})
//     res.status(200).json({msj:"holis"})
//     return NextResponse.json({msj:"mensaje enviado"})
//   }

// }
async function POST(request, res) {
  const whatsappClient =
  new Client({
    authStrategy: new LocalAuth(), // what ever authStrategy you are using,
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ],
    }
  });

whatsappClient.on("qr", (qr) => qrcode.generate(qr, { small: true }))
whatsappClient.on("ready", () => console.log("client is ready"))
whatsappClient.on("message", async (msg) => {
  try {
    if (msg.from != "status@broadcast") {
      const contact = await msg.getContact()
      console.log(contact, msg.body)
    }
  } catch (error) {
    console.log(error)
  }
})
  
  await res.status(200).send(whatsappClient.sendMessage({ body: request.message, phoneNumber: request.phoneNumber }))
  return NextResponse.json({ msj: "mensaje enviado" })

}
module.exports = POST
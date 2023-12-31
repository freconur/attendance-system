// const NextResponse = require("next/server")
// const whatsappClient = require('./whatsappClient')

const { Client, LocalAuth } = require('whatsapp-web.js')

// import 'qrcode-terminal' from

const  qrcode = require('qrcode-terminal')

const whatsappClient =
  new Client({
    authStrategy: new LocalAuth(), // what ever authStrategy you are using,
    puppeteer: {
      headless:true,
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

export default function message(req,res) {
  // const data = await req.message.create({
  //   body: data.message,
  //   phoneNumber: data.phoneNumber
  // })
  if(req.method === 'POST') {
    res.send(whatsappClient.sendMessage({body: req.message,phoneNumber: req.phoneNumber})) 
    res.status(200).json({msj:"holis"})
  }
  // req.send()

}
// async function POST(request) {
//   return NextResponse.json({ message: "mensaje enviado" })

// }
// module.exports = POST
// import { NextResponse } from "next/server"
const { Client, LocalAuth } = require('whatsapp-web.js')

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

function POST(request){
  try {
    whatsappClient.sendMessage(request.body.phoneNumber, request.body.message)
    // const data = await request.message.create({
    //   bode:data.message,
    //   phoneNumber:data.phoneNumber
    // })

    // return NextResponse.json({message:"mensaje enviado"})
  }catch(error) {
    console.log('error', error)
  }
}
module.exports = POST
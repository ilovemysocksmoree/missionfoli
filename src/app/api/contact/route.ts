import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const {NAME, EMAIL, FROM, SERVICE, PROJECT} = await req.json()

    await resend.emails.send({
      from: "Diya Karmacharya <hello@thehanasachikocompany.com>",
      to: "hello@thehanasachikocompany.com",
      subject: `New message from ${NAME}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${NAME}</p>
        <p><strong>Email:</strong> ${EMAIL}</p>
        <p><strong>Heard from:</strong> ${FROM}</p>
        <p><strong>Service:</strong> ${SERVICE}</p>
        <p><strong>Project:</strong> ${PROJECT}</p>
      `,
    })

    return new Response(JSON.stringify({success: true}), {status: 200})
  } catch (error) {
    return new Response(JSON.stringify({success: false, error}), {
      status: 500,
    })
  }
}

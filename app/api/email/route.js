import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  const { name, email, message } = await req.json();

  console.log("Received request:", { name, email, message }); // Log request data
  
  try {
    await sendgrid.send({
      to: 'nandipatisasankhreddy@gmail.com', // Your email where you want to receive messages
      from: 'nsasankhreddy@gmail.com', // Your verified sender email
      subject: `New message from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Error sending email' }), {
      status: 500,
    });
  }
}

const nodemailer = require('nodemailer');
require('dotenv').config();

const message = `
<body style="font-family: sans-serif">
    <h1 style="text-align: center">SENDING EMAILS THE 21st CENTURY WAY</h1>
    <p style="margin: 32px auto 0; text-align: center; max-width: 300px">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quos sed quod
      suscipit, labore quia quidem illum voluptate atque corrupti!
    </p>
    <img
      src="https://res.cloudinary.com/dlfxinw9v/image/upload/v1598868393/rd5ghxgs3wenbw6zz9yx.png"
      alt="Duffman"
      width="300"
      style="
        display: block;
        margin: 16px auto;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        outline: 3px groove silver;
      "
    />
    <p style="margin: 2rem auto 0; text-align: center; max-width: 40ch">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque asperiores
      eligendi, cupiditate qui laboriosam facilis!
    </p>
    <p
      class="footer"
      style="
        margin: 2rem auto 0;
        text-align: center;
        max-width: 300px;
        background: #000;
        color: white;
        padding: 1.5rem;
      "
    >
      Nodemailer | 2021
    </p>
  </body>
`;

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // create reusable transporter object using the default SMTP transport

  //* TESTING TRANSPORTER
  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.mailtrap.io', // you can sign up for an account here https://mailtrap.io/
  //   port: 2525,
  //   auth: {
  //     user: process.env.TEST_USER_EMAIL,
  //     pass: process.env.TEST_USER_PW,
  //   },
  // });

  //* PRODUCTION TRANSPORTER
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.PROD_USER_EMAIL,
      pass: process.env.PROD_USER_PW,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Your Testing Account Name" <youremail@address.com>', // sender address
    to: '<receiver@address.com>', // list of receivers
    subject: 'A normal email template.', // Subject line
    text: message.replace(/<[^>]*>/g, ''), // plain text body
    html: message, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
}

main().catch(console.error);

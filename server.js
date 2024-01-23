import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(cors()); 
app.use(bodyParser.json());

app.post('/mail', async (req, res)=>{
    const dataForm = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.VITE_USER_MAIL,
            pass: process.env.VITE_USER_PASSWORD
        }
    });

    const mailOptions = {
        from: dataForm.mail,
        to: process.env.VITE_ADMIN_MAIL,
        subject: dataForm.subject,
        text: `Name: ${dataForm.name}\nEmail: ${dataForm.mail}\nMessage: ${dataForm.message}`
    }
    try{
        await transporter.sendMail(mailOptions);

        console.log('Email sent');
        res.status(200).send('Email sent');
    }catch(error){
        console.log('Error final enviando el correo',error);
        res.status(500).send('Error final enviando el correo');
    }
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})
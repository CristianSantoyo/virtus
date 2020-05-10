const nodemailer = require('nodemailer');
const xoauth = require('xoauth2');
const helpers = {};
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
helpers.enviarCorreo = async(destino) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth.createXOAuth2Generator({                
                user: 'sant.da97a@gmail.com',
                clientId: '433605721438-em49gg478ek0im1dsh1kfvdd1t72mf4u.apps.googleusercontent.com',
                clientSecret: '_LSNna-UcNgIFLzRf4KWJMRH',
                refreshToken: '1//04-4lvBHQGNKQCgYIARAAGAQSNwF-L9IrCRGBjOIQMY799iMyZCt7zdMsOPGCRZKKIz-kGywCCzF2njIUtL5uOKpW2AiDJE2l4JY'
            })
        }
    });
    //console.log(transporter);
    
    const info = await transporter.sendMail({
        from: 'Virtus <sant.da97a@gmail.com>',
        to: 'sant.da97@hotmail.com',
        subject: 'Testeando Nodemailer',
        text: 'Changua'
    });

    console.log(info.messageId);
}

module.exports = helpers;
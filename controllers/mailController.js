const nodemailer = require("nodemailer");

const mailController = {
  sendMailRequest: async (req, res) => {
    const { name, email, service } = req.body;

    const outputToCustomer = `<html>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>XÁC THỰC TÀI KHOẢN</title>
        </head>
        <body style=" font-family: Arial, Helvetica, sans-serif;color: #212529;">
           
            <main style="color: #212529;">
                <br />
                <div style="padding-bottom:20px">
                    <div style="color: #212529;text-align: center; font-weight: bold; font-size: 28px; ">
                        XÁC NHẬN YÊU CẦU BÁO GIÁ
                    </div>
                    <br>
                    <div style="color: #212529;width: 600px; margin: auto; text-align: justify; font-size: 16px;">
                        Xin chào: <p style="display: inline; font-weight: bold">${name}</p> <br>
                        Email: <p style="display: inline; font-weight: bold">${email}</p> <br><br>
                        Anh/Chị đã đăng ký nhận báo giá thành công dịch vụ: <b>${service} </b>.  chúng tôi sẽ phản hồi tới anh/chị trong thời gian sớm nhất <br> <br>
                        Nếu Anh/Chị có thắc mắc hãy liên hệ ngay Hotline (+84)97 317 5839 để được hỗ trợ nhanh nhất. <br><br>
                        Thân mến, chúc Anh/Chị một ngày tốt lành <br>
                        <p style="display: inline; font-weight: bold;">COMMO</p>
                        <hr style="margin-top: 30px;margin-bottom: 40px;"/>
                    </div>
                   
                </div>
            </main>
            <div class="container-fluid" style="background-color: #F5F5F5; text-align: center;padding:20px">
              
                (+84) 8 1949 0540 <br>
               COMO <br>
                VP: Tòa nhà SBI, Lô 6B, ĐS 03, QTSC, P. Tân Cánh Hiệp, Q.12, TP.HCM <br>
                Trụ sở: E9, A2, KDC Tín Phong, P. Tân Thới Nhất, Q 12, TP.HCM <br><br>
                Copyright @ 2023 COMO All rights reserved <br>
                Contact email: blabla@gmail.com <br>
            </div>
          </body>
        </html>`;

    const outputToAdmin = `<html>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>XÁC THỰC TÀI KHOẢN</title>
        </head>
        <body style=" font-family: Arial, Helvetica, sans-serif;color: #212529;">
           
            <main style="color: #212529;">
                <br />
                <div style="padding-bottom:20px">
                    <div style="color: #212529;text-align: center; font-weight: bold; font-size: 28px; ">
                        XÁC NHẬN YÊU CẦU BÁO GIÁ
                    </div>
                    <br>
                    <div style="color: #212529;width: 600px; margin: auto; text-align: justify; font-size: 16px;">
                        Bạn có yêu cầu báo giá từ : <p style="display: inline; font-weight: bold">${name}</p> <br>
                        Email: <p style="display: inline; font-weight: bold">${email}</p> <br><br>
                        Về dịch vụ: <b>${service} </b>. <br/>
                        <p style="display: inline; font-weight: bold;">COMMO</p>
                        <hr style="margin-top: 30px;margin-bottom: 40px;"/>
                    </div>
                   
                </div>
            </main>
            <div class="container-fluid" style="background-color: #F5F5F5; text-align: center;padding:20px">
              
                (+84) 8 1949 0540 <br>
               COMO <br>
                VP: Tòa nhà SBI, Lô 6B, ĐS 03, QTSC, P. Tân Cánh Hiệp, Q.12, TP.HCM <br>
                Trụ sở: E9, A2, KDC Tín Phong, P. Tân Thới Nhất, Q 12, TP.HCM <br><br>
                Copyright @ 2023 COMO All rights reserved <br>
                Contact email: blabla@gmail.com <br>
            </div>
          </body>
        </html>`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: process.env.EMAIL_SEND_MAIL, // generated ethereal user
        pass: process.env.PASS_SEND_MAIL, // generated ethereal password
      },
    });

    // send mail to admin
    let info = await transporter.sendMail({
      from: process.env.EMAIL_SEND_MAIL, // sender address
      to: process.env.EMAIL_SEND_MAIL, // list of receivers
      subject: "Thông báo từ COMMO Tới admin", // Subject line
      html: outputToAdmin, // html body
    });

    // send mail to Customer
    let info2 = await transporter.sendMail({
      from: process.env.EMAIL_SEND_MAIL, // sender address
      to: email, // list of receivers
      subject: "Thông báo từ COMMO cho khách hàng", // Subject line
      html: outputToCustomer, // html body
    });

    //   console.log("Message sent: %s", info.messageId);
    //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //   // Preview only available when sending through an Ethereal account
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return res.send("sended mail");
  },

  sendMailQuery: async (req, res) => {
    const { name, email, subject, message } = req.body;

    const outputToAdmin = `<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Liên hệ với bất kỳ câu hỏi nào</title>
    </head>
    <body style=" font-family: Arial, Helvetica, sans-serif;color: #212529;">
       
        <main style="color: #212529;">
            <br />
            <div style="padding-bottom:20px">
                <div style="color: #212529;text-align: center; font-weight: bold; font-size: 28px; ">
                Liên hệ với bất kỳ câu hỏi nào
                </div>
                <br>
                <div style="color: #212529;width: 600px; margin: auto; text-align: justify; font-size: 16px;">
                    Bạn có câu hỏi từ: <p style="display: inline; font-weight: bold">${name}</p> <br>
                    Email: <p style="display: inline; font-weight: bold">${email}</p> <br><br>
                    <b>${message} </b> <br/>
                    <p style="display: inline; font-weight: bold;">COMMO</p>
                    <hr style="margin-top: 30px;margin-bottom: 40px;"/>
                </div>
               
            </div>
        </main>
        <div class="container-fluid" style="background-color: #F5F5F5; text-align: center;padding:20px">
          
            (+84) 8 1949 0540 <br>
           COMO <br>
            VP: Tòa nhà SBI, Lô 6B, ĐS 03, QTSC, P. Tân Cánh Hiệp, Q.12, TP.HCM <br>
            Trụ sở: E9, A2, KDC Tín Phong, P. Tân Thới Nhất, Q 12, TP.HCM <br><br>
            Copyright @ 2023 COMO All rights reserved <br>
            Contact email: blabla@gmail.com <br>
        </div>
      </body>
    </html>`;

    const outputToCustomer = `<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Liên hệ với bất kỳ câu hỏi nào</title>
    </head>
    <body style=" font-family: Arial, Helvetica, sans-serif;color: #212529;">
       
        <main style="color: #212529;">
            <br />
            <div style="padding-bottom:20px">
                <div style="color: #212529;text-align: center; font-weight: bold; font-size: 28px; ">
                Liên hệ với bất kỳ câu hỏi nào
                </div>
                <br>
                <div style="color: #212529;width: 600px; margin: auto; text-align: justify; font-size: 16px;">
                    Cảm ơn <p style="display: inline; font-weight: bold">${name}</p> đã đặt câu hỏi cho COMO <br>
                    Chúng tôi sẽ trả lời câu hỏi của bạn trong thời gian sớm nhất  <br />
                    <p style="display: inline; font-weight: bold;">COMMO</p>
                    <hr style="margin-top: 30px;margin-bottom: 40px;"/>
                </div>
               
            </div>
        </main>
        <div class="container-fluid" style="background-color: #F5F5F5; text-align: center;padding:20px">
          
            (+84) 8 1949 0540 <br>
           COMO <br>
            VP: Tòa nhà SBI, Lô 6B, ĐS 03, QTSC, P. Tân Cánh Hiệp, Q.12, TP.HCM <br>
            Trụ sở: E9, A2, KDC Tín Phong, P. Tân Thới Nhất, Q 12, TP.HCM <br><br>
            Copyright @ 2023 COMO All rights reserved <br>
            Contact email: blabla@gmail.com <br>
        </div>
      </body>
    </html>`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: process.env.EMAIL_SEND_MAIL, // generated ethereal user
        pass: process.env.PASS_SEND_MAIL, // generated ethereal password
      },
    });

    // send mail to admin
    let info = await transporter.sendMail({
      from: process.env.EMAIL_SEND_MAIL, // sender address
      to: process.env.EMAIL_SEND_MAIL, // list of receivers
      subject: subject, // Subject line
      html: outputToAdmin, // html body
    });

    // send mail to Customer
    let info2 = await transporter.sendMail({
      from: process.env.EMAIL_SEND_MAIL, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: outputToCustomer, // html body
    });

    return res.send("sended mail query");
  },
};

module.exports = mailController;

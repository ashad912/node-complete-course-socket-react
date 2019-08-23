import sgMail from '@sendgrid/mail'


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

/*sgMail.send({
    to: 'ashad912@gmail.com',
    from: 'ashad912@gmail.com', //reach spam folder, cause i did not provide any priveleges
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to you.'
})*/

export const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ashad912@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know you get along with the app.`
    })
}

export const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ashad912@gmail.com',
        subject: 'We are sad to see off!',
        text: `Bye! U tiring us apart ${name}.`
    })
}
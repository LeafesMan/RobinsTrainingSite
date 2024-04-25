import emailjs from '@emailjs/browser';


// Toggle for sending emails 
// as not to exceed email quota during testing
export const sendEmails = true;



export default function SendEmail( to_name: string, training_name: string) {
    if (!sendEmails) {
        console.log("Emailing is Disabled! Enable it in Email.ts @ line: 3 \"const sendEmails = false;\"");
        return;
    }

    const emailObj = {
        to_name: to_name,
        training_name: training_name,
    }

    emailjs.send('service_cduuzd5', 'template_jfb361m', emailObj, 'uU9Fuezlgrp8SyU6x')
        .then((result) => { console.log("Email Result: " + result.text); },
            (error) => { console.log(error.text); });
}
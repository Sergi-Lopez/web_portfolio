document.querySelector('.contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    const sendgrid_api = process.env.SENDGRID_API_KEY;
    const mi_email = process.env.SENDGRID_EMAIL;

    try {
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: sendgrid_api
            },
            body: JSON.stringify({
                personalizations: [
                    {
                        to: [{ email: mi_email }],
                        dynamic_template_data: {
                            name,
                            email,
                            message
                        }
                    }
                ],
                from: { email: mi_email },
                subject: 'Nuevo contacto desde la web',
                content: [
                    {
                        type: 'text/html',
                        value: `
                            <p>Hola Sergi, tienes un nuevo contacto desde la web:</p>
                            <p>Nombre: ${name}</p>
                            <p>Correo: ${email}</p>
                            <p>Mensaje: ${message}</p>
                        `
                    }
                ]
            })
        });

        if (response.ok) {
            alert('¡Correo enviado con éxito!');
        } else {
            alert('Hubo un error al enviar el correo. Por favor, inténtalo nuevamente.');
        }
    } catch (error) {
        alert('Error al enviar el formulario: ' + error.message);
    }
});

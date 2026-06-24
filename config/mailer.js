const { Resend } = require("resend");
const mailConfig = require("./mail");

const resend = new Resend(mailConfig.apiKey);

function parseRecipient(to) {
	if (Array.isArray(to)) return to;
	return [to];
}

async function sendMail({ from, to, subject, html, replyTo }) {
	if (!mailConfig.apiKey) {
		throw new Error("RESEND_API_KEY não configurada");
	}

	const { data, error } = await resend.emails.send({
		from: from || mailConfig.from,
		to: parseRecipient(to),
		subject,
		html,
		replyTo: replyTo || mailConfig.replyTo
	});

	if (error) {
		throw error;
	}

	return data;
}

module.exports = { sendMail };

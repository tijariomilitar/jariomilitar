const https = require("https");
const mailConfig = require("./mail");

function parseRecipient(to) {
	if (Array.isArray(to)) return to;
	return [to];
}

function sendMail({ from, to, subject, html, replyTo }) {
	if (!mailConfig.apiKey) {
		return Promise.reject(new Error("RESEND_API_KEY não configurada"));
	}

	const payload = JSON.stringify({
		from: from || mailConfig.from,
		to: parseRecipient(to),
		subject,
		html,
		reply_to: replyTo || mailConfig.replyTo
	});

	return new Promise((resolve, reject) => {
		const req = https.request(
			{
				hostname: "api.resend.com",
				path: "/emails",
				method: "POST",
				headers: {
					Authorization: `Bearer ${mailConfig.apiKey}`,
					"Content-Type": "application/json",
					"Content-Length": Buffer.byteLength(payload)
				}
			},
			(res) => {
				let body = "";
				res.on("data", (chunk) => { body += chunk; });
				res.on("end", () => {
					let data;
					try {
						data = JSON.parse(body);
					} catch (err) {
						return reject(new Error(`Resend: resposta inválida (${res.statusCode})`));
					}

					if (res.statusCode >= 200 && res.statusCode < 300) {
						return resolve(data);
					}

					const error = new Error(data.message || "Erro ao enviar e-mail");
					error.statusCode = res.statusCode;
					error.response = data;
					reject(error);
				});
			}
		);

		req.on("error", reject);
		req.write(payload);
		req.end();
	});
}

module.exports = { sendMail };

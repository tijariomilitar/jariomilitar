module.exports = {
	apiKey: process.env.RESEND_API_KEY,
	from: process.env.MAIL_FROM || "JA Rio Militar <comercial@jariomilitar.com>",
	replyTo: process.env.MAIL_REPLY_TO || "comercial@jariomilitar.com"
};

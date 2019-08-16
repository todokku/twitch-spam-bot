const TwitchBot = require('twitch-bot');
const BOTNAME = "NICKNAME";
const OAUTH_TOKEN = "TOKEN";

function TEMP_TEST() {
	Bot = new TwitchBot({
		username: BOTNAME,
		oauth: OAUTH_TOKEN,
		channels: ["CHANNEL"]
	})
	
	let startCommand = "START BOT"
	let stopCommand = "ЗАТКНИСЬ ТВАРЬ"
	let disableCommand = "ЗАТКНИСЬ НАВСЕГДА"
	let disablebyanyone = false
	
	let text = ("D: ".repeat(15) + " (ТЕКСТ #" + i + ") ").repeat(4) + " для остановки бота на 5 минут напишыте " + stopCommand + " или дайте мут на сколько нужно, плиз не пермач))"
	let delay = 2000
	let autowaittime = 5 * 60 * 1000
	
	let disabled = false;
	let autoid = false;
	let iid = false;
	let i = 0;
	
	Bot.on('join', (...p) => {
		console.log("JOIN: ", ...p);
	});

	Bot.on('error', (...p) => {
		console.log("ERROR: ", ...p);
	});
	
	function start(auto) {
		console.log((auto ? "AUTO " : "MANUAL ") + "START");
		disabled = false;
		if (iid) clearInterval(iid);
		i = 0;
		iid = setInterval(() => {
			i += 1;
			Bot.say(text);
			console.log("Message #" + i);
		}, delay);
	}
	
	Bot.on('message', (msg) => {
		if (msg.message === startCommand && msg.username === BOTNAME.toLowerCase()) {
			start(false);
		}
		if (msg.message === stopCommand || msg.message == disableCommand) {
			if (!disabled) {
				if (iid) clearInterval(iid);
				console.log("STOP by " + msg.username + " at msg #" + i);
				if (msg.message == disableCommand && (msg.username === BOTNAME.toLowerCase() || disablebyanyone)) {
					disabled = true;
				}
				else {
					if (autoid) clearTimeout(autoid);
					autoid = setTimeout(() => {
						start(true);
					}, autowaittime);
				}
			}
		}
	});
}

BOT();

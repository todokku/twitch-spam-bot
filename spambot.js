const TwitchBot = require('twitch-bot');
const BOTNAME = "33kk";
const OAUTH_TOKEN = "oauth:";
const CHANNEL = "zakvielchannel"
const startCommand = "START BOT"
const stopCommand = "ЗАТКНИСЬ ТВАРЬ"
const disableCommand = "ЗАТКНИСЬ НАВСЕГДА"
let   text = ("D: ".repeat(15) + " (ТЕКСТ ТЕКСТ АТАТАТА #$i$) ").repeat(4) + " для остановки бота на 5 минут напишыте " + stopCommand
const delay = 2000
const autowaittime = 5 * 60 * 1000


///////////////////////////////////////////////////


Bot = new TwitchBot({
	username: BOTNAME,
	oauth: OAUTH_TOKEN,
	channels: [CHANNEL]
})

let disablebyanyone = false
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
	iid = false;
	i = 0;
	iid = setInterval(() => {
		i += 1;
		let curText = text.replace('$i$', i);
		if (curText.length >= 490)
			curText = "..." + curText.substring((curText.length - 490) + 5);
		Bot.say(curText);
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
			iid = false;
			console.log("STOP by " + msg.username + " at msg #" + i);
			if (msg.message == disableCommand && (msg.username === BOTNAME.toLowerCase() || disablebyanyone)) {
				disabled = true;
			}
			else {
				if (autoid) clearTimeout(autoid);
				autoid = false;
				autoid = setTimeout(() => {
					start(true);
				}, autowaittime);
			}
		}
	}
});

const template = require("./template.js");
process.stdin.setEncoding("utf8");

let json = "";

const UID = process.argv[2];
const URL = process.argv[3];

process.stdin.on("readable", () => {
	const chunk = process.stdin.read();
	if (chunk !== null) {
		json += chunk;
	}
});

process.stdin.on("end", () => {
	const ticketData = JSON.parse(json);
	console.log(template(ticketData, UID, URL));
});

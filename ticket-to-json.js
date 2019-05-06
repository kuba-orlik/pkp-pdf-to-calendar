const moment = require("moment");
const PDFParser = require("j-pdfjson");

let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData =>
	console.error("ERROR!", errData)
);
pdfParser.on("pdfParser_dataReady", pdfData => {
	const ticketData = pdfData.formImage.Pages[0].Texts.map((e, index) => ({
		x: e.x,
		y: e.y,
		t: decodeURIComponent(e.R[0].T),
		i: index,
	}))
		.filter((element, index, arr) => {
			const offset = arr.filter(e => e.t == "Od/From ")[0].i;
			return [9, 11, 38, 39, 40, 41, 42, 43, 45, 46]
				.map(i => i + offset)
				.includes(index);
		})
		.map(e => e.t)
		.reduce(
			(acc, cur, idx) => ({
				...acc,
				[[
					"from",
					"to",
					"start_date",
					"end_date",
					"start_hour",
					"end_hour",
					"train",
					"car",
					"place",
					"car_type",
				][idx]]: cur,
			}),
			{}
		);
	ticketData.start_time = moment(
		`${ticketData.start_date} ${ticketData.start_hour}`,
		"DD.MM HH:mm"
	);
	ticketData.end_time = moment(
		`${ticketData.end_date} ${ticketData.end_hour}`,
		"DD.MM HH:mm"
	);
	console.log(JSON.stringify(ticketData));
});

pdfParser.loadPDF(process.argv[2]);

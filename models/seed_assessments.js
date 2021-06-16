const mongoose = require('mongoose');
const _ = require('lodash');
const { assessmentModel } = require('./assessments');

const mongoURI = `mongodb://localhost:27017/studentsDatabase?readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
let assessmentData = [
	{
		score: 70,
		testPaper: 'SA1 maths',
		date: '12 June 2020',
		id: 0,
	},
	{
		score: 90,
		testPaper: 'SA1 English',
		date: '10 June 2020',
		id: 0,
	},
];

let connection = null;

mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((connResp) => {
		connection = connResp;
		return assessmentModel.insertMany(assessmentData);
	})
	.then((insertResp) => {
		console.log('successful data insertion');
	})
	.catch((err) => {
		console.log(err);
	})
	.finally(() => {
		if (connection !== null) {
			connection.disconnect();
		}
	});

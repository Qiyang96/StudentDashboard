const mongoose = require('mongoose');
const _ = require('lodash');
const { HomeworkModel } = require('./homework');

const mongoURI = `mongodb://localhost:27017/studentsDatabase?readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
let homeworkData = [
	{
		date: 02 / 08 / 2021,
		homework: 'SA1 maths',
		comments: 'improve on compo',
		slug: 1,
	},
];

let connection = null;

mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((connResp) => {
		connection = connResp;
		return HomeworkModel.insertMany(homeworkData);
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

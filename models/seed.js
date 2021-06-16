const mongoose = require('mongoose');
const _ = require('lodash');
const { StudentModel } = require('./students');

const mongoURI = `mongodb://localhost:27017/studentsDatabase?readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
let data = [
	{
		name: 'Shi Han',
		level: 'Primary 6',
		subjects: 'English, Maths, Science',
		image:
			'https://media.istockphoto.com/vectors/cute-hanging-sloth-vector-id1093750176',
		homework: [0],
		assessment: [0],
	},
	{
		name: 'Leenus',
		level: 'Primary 5',
		subjects: 'English, Maths, Science',
		image:
			'https://www.how-to-draw-funny-cartoons.com/images/cartoon-chipmunk-008.jpg',
		homework: [1],
	},
];

data = data.map((item) => {
	item.slug = _.kebabCase(item.name);
	return item;
});

let connection = null;

mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((connResp) => {
		connection = connResp;
		return StudentModel.insertMany(data);
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

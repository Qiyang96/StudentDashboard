const mongoose = require('mongoose');
const _ = require('lodash');

const studentsSchema = new mongoose.Schema({
	slug: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	level: { type: String, required: true },
	subjects: { type: String, required: true },
	image: { type: String, required: true },
	homework: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Homework' }],
	assessments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
});

const StudentModel = mongoose.model('Student', studentsSchema);

let students = [
	{
		name: 'Shi Han',
		level: 'Primary 6',
		subjects: 'English, Maths, Science',
		image:
			'https://media.istockphoto.com/vectors/cute-hanging-sloth-vector-id1093750176',
	},
	{
		name: 'Leenus',
		level: 'Primary 5',
		subjects: 'English, Maths, Science',
		image:
			'https://www.how-to-draw-funny-cartoons.com/images/cartoon-chipmunk-008.jpg',
	},
];

module.exports = { students, StudentModel };

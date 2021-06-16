const mongoose = require('mongoose');
const _ = require('lodash');

const homeworkSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	homework: { type: String, required: true },
	comments: { type: String, required: false },
	slug: { type: Number, required: false },
	student: { type: String, ref: 'Student' },
});

const HomeworkModel = mongoose.model('Homework', homeworkSchema);

module.exports = { HomeworkModel };

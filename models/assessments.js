const mongoose = require('mongoose');
const _ = require('lodash');

const assessmentSchema = new mongoose.Schema({
	score: { type: Number, required: true },
	testPaper: { type: String, required: true },
	date: { type: String, required: true },
	student: { type: String, ref: 'Student' },
});

const assessmentModel = mongoose.model('Assessment', assessmentSchema);

module.exports = { assessmentModel };

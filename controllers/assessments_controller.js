const { assessments, assessmentModel } = require('../models/assessments');
const { students, Students, StudentModel } = require('../models/students');
const _ = require('lodash');

module.exports = {
	createAssessment: (req, res) => {
		let date = req.body.date;
		let score = req.body.score;
		let testPaper = req.body.testPaper;
		let student = req.body.student;

		StudentModel.findOne({ slug: req.params.slug }).then((result) => {
			if (!result) {
				res.send('student not found');
			}
			assessmentModel
				.create({
					date: date,
					score: score,
					testPaper: testPaper,
					student: req.params.slug,
				})
				.then((assessment) => {
					StudentModel.updateOne(
						{ slug: student },
						{
							$push: {
								assessments: assessment._id,
							},
						}
					).then((result) => {
						let slug = req.params.slug;
						console.log(result);
						res.redirect('/students/' + slug);
					});
				})
				.catch((err) => {
					console.log(err);
					res.send(err);
				});
		});
	},

	editAssessmentDetails: (req, res) => {
		assessmentModel
			.findOne({ _id: req.params.id })
			.then((response) => {
				res.render('edit_assessment', {
					assessments: response,
					student: req.params.slug,
				});
			})
			.catch((err) => {
				console.log(err);
				res.send('db error');
			});
	},

	update: (req, res) => {
		assessmentModel
			.updateOne(
				{ _id: req.params.id },
				{
					$set: {
						date: req.body.date,
						testPaper: req.body.testPaper,
						score: req.body.score,
						student: req.body.student,
					},
				}
			)
			.then((response) => {
				res.redirect('/students/' + req.body.student);
			})
			.catch((err) => {
				console.log(err);
				res.send('db error');
			});
	},

	delete: (req, res) => {
		let slug = req.params.slug;
		console.log('ppp' + req.params.slug);
		assessmentModel
			.updateOne(
				{ slug },
				{
					$pull: {
						assessments: req.params.id,
					},
				}
			)
			.then((result) => {
				console.log('peepee' + req.params.id);
				assessmentModel
					.deleteOne({ _id: req.params.id })
					.then((deleteResult) => {
						res.redirect('/students/' + slug);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	},
};

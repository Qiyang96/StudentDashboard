const { homework, HomeworkModel } = require('../models/homework');
const { students, Students, StudentModel } = require('../models/students');
const _ = require('lodash');

module.exports = {
	createHomework: (req, res) => {
		let date = req.body.date;
		let homework = req.body.homework;
		let comments = req.body.comments;
		let student = req.body.student;

		StudentModel.findOne({ slug: req.params.slug }).then((result) => {
			if (!result) {
				res.send('student not found');
			}
			HomeworkModel.create({
				date: date,
				homework: homework,
				comments: comments,
				student: req.params.slug,
			})
				.then((homework) => {
					StudentModel.updateOne(
						{ slug: student },
						{
							$push: {
								homework: homework._id,
							},
						}
					).then((result) => {
						let slug = req.params.slug;

						res.redirect('/students/' + slug);
					});
				})
				.catch((err) => {
					console.log(err);
					res.send(err);
				});
		});
	},

	editHomeworkDetails: (req, res) => {
		HomeworkModel.findOne({ _id: req.params.id })
			.then((response) => {
				res.render('edit_homework', {
					homework: response,
					student: req.params.slug,
				});
			})
			.catch((err) => {
				console.log(err);
				res.send('db error');
			});
	},

	update: (req, res) => {
		HomeworkModel.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					date: req.body.date,
					homework: req.body.homework,
					comments: req.body.comments,
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
		StudentModel.updateOne(
			{ slug },
			{
				$pull: {
					homework: req.params.id,
				},
			}
		)
			.then((result) => {
				HomeworkModel.deleteOne({ _id: req.params.id })
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

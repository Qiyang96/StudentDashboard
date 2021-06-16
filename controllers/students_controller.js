const { students, Students, StudentModel } = require('../models/students');
const { homeworks, Homeworks, HomeworkModel } = require('../models/homework');
const { assessments, assessmentModel } = require('../models/assessments');
const _ = require('lodash');
const { forEach } = require('lodash');

module.exports = {
	index: (req, res) => {
		StudentModel.find({}, (error, allStudents) => {
			HomeworkModel.find({}, (error, allHomework) => {
				res.render('index', {
					students: allStudents,
					homeworks: allHomework,
				});
			});
		});
	},

	show: (req, res) => {
		StudentModel.findOne({ slug: req.params.slug })
			.populate(['homework', 'assessments'])
			//.populate('')
			.then((studentObject) => {
				// if item is not found, redirect to homepage
				if (!studentObject) {
					res.redirect('/students');
					return;
				}
				console.log(studentObject);
				let data = {
					student: studentObject,
					paper: [],
					score: [],
				};
				studentObject.assessments.forEach((a) => {
					data.paper.push(a.testPaper);
					data.score.push(a.score);
				});
				return res.render('show', data);
			})
			.catch((err) => {
				console.log(err);
				res.redirect('/students');
			});
	},

	editStudentDetails: (req, res) => {
		// find student details from DB
		StudentModel.findOne({ slug: req.params.slug })
			.then((response) => {
				// then render template with studnent details
				res.render('edit', {
					student: response,
				});
			})
			.catch((err) => {
				console.log(err);
				res.send('db error');
			});
	},

	update: (req, res) => {
		if (!req.body.name) {
			res.redirect('/students/' + req.params.slug + '/edit');
			return;
		}
		console.log(req.parms);
		StudentModel.updateOne(
			{ slug: req.params.slug },
			{
				$set: {
					name: req.body.name,
					level: req.body.level,
					subjects: req.body.subjects,
					image: req.body.image,
				},
			}
		)
			.then((response) => {
				res.redirect('/students/');
			})
			.catch((err) => {
				console.log(err);
				res.send('db error');
			});
	},

	delete: (req, res) => {
		StudentModel.deleteOne({ slug: req.params.slug })
			.then((response) => {
				res.redirect('/students');
			})
			.catch((err) => {
				res.send('db err');
			});
	},

	newStudent: (req, res) => {
		res.render('create');
	},

	create: (req, res) => {
		let name = req.body.name;
		let level = req.body.level;
		let subjects = req.body.subjects;
		let image = req.body.image;

		let slug = _.kebabCase(req.body.name);

		StudentModel.create({
			name: name,
			level: level,
			slug: slug,
			subjects: subjects,
			image: image,
		})
			.then((response) => {
				res.redirect('/students');
			})
			.catch((err) => {
				console.log(err);
				res.send('error occurred');
			});
	},
};

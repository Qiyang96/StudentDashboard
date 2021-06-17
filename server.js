require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const students_controller = require('./controllers/students_controller');
const homework_controller = require('./controllers/homework_controller');
const assessments_controller = require('./controllers/assessments_controller');
const app = express();
const port = process.env.PORT || 3000;

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// create route
app.get('/students/create', students_controller.newStudent);
app.post('/students', students_controller.create);

// show
app.get('/students/:slug', students_controller.show);

//index
app.get('/students', students_controller.index);

//HOMEWORK ROUTES

// create homework route
app.post('/students/:slug/homeworks', homework_controller.createHomework);

// delete homework route
app.delete('/students/:slug/homeworks/:id', homework_controller.delete);

// edit
app.get(
	'/students/:slug/homeworks/:id/edit',
	homework_controller.editHomeworkDetails
);

// patch
app.patch('/homeworks/:id', homework_controller.update);

//ASSESSMENT ROUTES

// create assessment route
app.post(
	'/students/:slug/assessments',
	assessments_controller.createAssessment
);

// delete assessments route
app.delete('/students/:slug/assessments/:id', assessments_controller.delete);

// edit
app.get(
	'/students/:slug/assessments/:id/edit',
	assessments_controller.editAssessmentDetails
);

// patch
app.patch('/assessments/:id', assessments_controller.update);

//---------//

// edit
app.get('/students/:slug/edit', students_controller.editStudentDetails);

// patch
app.patch('/students/:slug', students_controller.update);

// delete route
app.delete('/students/:slug', students_controller.delete);

mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((response) => {
		app.listen(port, () => {
			console.log(`app listening on port: ${port}`);
		});
	});

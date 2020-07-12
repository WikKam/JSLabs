const Sequelize = require('sequelize');
const db = require('../database.js');
const Subject = db.define('Subject',{
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    }
},{ timestamps: false })
const Instructor = db.define('Instructor',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{ timestamps: false })
const Student = db.define('Student',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    studentCardNumber:{
        type:Sequelize.INTEGER, 
        allowNull: false,
        unique: true
    }
},{ timestamps: false })
const SubjectMark = db.define('SubjectMark',{
    mark: {
        type: Sequelize.INTEGER,
        max: 5,
        min: 2
    }
},{ timestamps: false });

/*SubjectInstance.hasMany(Student);
SubjectInstance.belongsTo(Instructor);
SubjectInstance.belongsTo(Subject);
Instructor.belongsToMany(SubjectInstance,{through: 'InstructorSubjectInstance'});
Student.belongsToMany(SubjectInstance,{through: 'StudentSubjectInstance'});
Mark.belongsTo(SubjectInstance);
Mark.belongsTo(Student);
Student.hasMany(Mark);*/
Instructor.belongsToMany(Subject, {through:"InstructorSubject"});
Student.belongsToMany(Subject, {through:"StudentSubject"});
Subject.belongsToMany(Student, {through:"StudentSubject"});
SubjectMark.belongsTo(Subject);
SubjectMark.belongsTo(Student);
Student.hasMany(SubjectMark);
Instructor.hasMany(SubjectMark);
db.sync();
module.exports = {Subject, Instructor, Student, SubjectMark};

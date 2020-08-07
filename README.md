# project-2-backend Overview

## Project Schedule

|  Day | Deliverable | Status
|-----|----------------------------------------------| ----------|
|Day 1 - Friday | Pre-work: Project Description                          | Complete
|Day 1 - Friday | Pre-work: Wireframes / Priority Matrix / Timeline      | Complete
|Day 2 - Saturday | Start backend logic                                  | Complete
|Day 3 - Sunday | Complete backend and test                              | Complete

Project Schedule continued in [Frontend](https://github.com/RosmaryFC/project-2-frontend)

## Project Description

Link to final [project](https://project-2-backend.herokuapp.com)

Introducing, Our Unit-2 project for General Assembly's SEI program.
For Project 12, I will be creating a fullstack website for my karate school to manage students with their payments and progress.
 The backend will include:
 * a Schema for students and parents
 * A student, if under 18, must have a parent or guardian reference
 * The ability to Create, Read, Update, and Destroy a student or parent document


## Wireframes for Schemas

```
Student Schema
{
  first name:
  last name:
  date Of birth:
  rank:
  contact info: {
    phone number:
    email:
    address:
  }
  billing: {
    plan: /// 1 month, 6 months, 1 year
    start date: 
    reneweal date:
    monthly due date:
    monthly fee:
    past due: // true or false
    past due balance:
    current balance: 
    is insured: // true or false //?? might remove
    insurance renewal date: //??might remove
  }
  attendance: //?? might remove
  parent/guardian: [{
    guardian:
    relationship //mother, father, aunt, emergency
  }]
}

Parent Schenma
{
  first name:
  last name:
  contact info: {
    phone number:
    email:
    address:
  }
  prefferred communication: { //??might remove
    email: //true or false
    whatsapp: true or false
    text: // true or false
  }
  student: []
}

```

## Time/Priority Matrix 

You can check out my `Time and Priority` Matix [here](https://res.cloudinary.com/rosefc/image/upload/v1596341025/project%202/projectTwoBackendTimePriorityMatrix.png)

### MVP

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

*  Create controllers for Students
   * Read all students
   * find students by first name
   * find students by last name
   * find students by first and last name
   * find students by Karate School ID
   * find all past due students
   * update student info
   * create student
   * delete student
  
* Create controllers for Parents
   *  Read all parents
   * find parent by first name
   * find parent by last name
   * find parent by phone number
   * find parent by email
   * Create parent
   * Update parent info
   * delete parent
   * parent has a reference to child(student), but parent should also show past due balance of what is owed for each child(student) -- this might be done in front end
  

## Functional Components

I've broken down each part of the backend to smaller tasks below.

#### MVP

| Component                                  | Priority | Estimated Time | Time Invested  | Actual Time |
| ---                                        | :---:    |  :---:         | :---:          | :---:       |
| Initial Setup/ boilerplate code            | H        | 1hr            | .5hr            | -hr         |
| Seed Data                                  | H        | 1hr            | 9hr            | -hr         |
| Create Models for students                 | H        | 1hr            | .5hr            | -hr         |
| Create Models for parents                  | H        | 1hr            | .5hr            | -hr         |
| Create Controller for students             | H        | 1hr            | 1hr            | -hr         |
| Create Controller for parents              | H        | 1hr            | 15hr            | -hr         |
| Create Routes for students                 | H        | 1hr            | .5hr            | -hr         |
| Create Routes for parents                  | H        | 1hr            | .5hr            | -hr         |
| Test routes for students                   | H        | 2hr            | 2hr            | -hr         |
| Test routes for parents                    | H        | 2hr            | 2hr            | -hr         |
| Deploy on Heroku                           | H        | 1hr            | 12hr            | -hr         |
| Total                                      |          | 14hrs          | 43.5hr            | -hr         |


## Additional Libraries
 This section lists all supporting libraries and their role in the project.
 * [express](http://expressjs.com/) - A framework for bode that allows users to write handlers for requests with different HTTP verbs at different URL paths (routes)
 * [mongoose](https://mongoosejs.com/docs/2.7.x/index.html) - An Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
 * [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) - a node package for providing a [Connect](https://github.com/senchalabs/connect#readme)/[Express](http://expressjs.com/) middleware that can be used to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (cross-origin resource sharing) with various options. It is used for security.
 * [dotenv](https://www.npmjs.com/package/dotenv) - A module that loads environment variables used for configuration
 * [morgan](https://www.npmjs.com/package/morgan) - A HTTP request logger middleware for node.js


## Code Snippet

This section will include a brief code snippet of functionality that I am proud of and a brief description  

This piece of code is what allows you to create a guardian and select students to add as reference to guardian and also add guardian as a reference to student

```
const createGuardian = async (req,res) => {
    try{
        const guardianReqBody = req.body;

        for (let i = 0; i < guardianReqBody.students.length; i++) {
            const student = guardianReqBody.students[i];
            console.log('student', student)

            //split full name to firstName and lastName
            const nameSplit = student.split(" ");
            console.log('nameSplit', nameSplit)

            //find student document with matching name
            let studentDoc = await Student.findOne({
                $and: [
                    {firstName: nameSplit[0]},
                    {lastName: nameSplit[1]}
                ]
            })

            console.log('studentDoc', studentDoc);
            console.log('studentDocID', studentDoc._id);

            // replace name in list of students with student ID in guardian
            guardianReqBody.students[i] = studentDoc._id;    
            console.log('guardianReqBody', guardianReqBody);
        }


        //create Guardian
        const newGuardian = await Guardian.create(guardianReqBody);
        console.log('newGuardian', newGuardian);

        for(let i = 0; i < guardianReqBody.students.length; i++) {
            //find student document with matching name
            let studentDoc = await Student.findById(guardianReqBody.students[i]);
            console.log('studentDoc:' + studentDoc);

            console.log('new guardian id', newGuardian._id);

            //push Guardian ID to student.guardians array
            await studentDoc.guardians.push(newGuardian._id);
            await studentDoc.save()
        }

        // const allGuardians = await Guardian.find({}).sort({firstName:1});
        res.status(200).json(newGuardian);
    }catch(error){
        res.status(400).send(error);
    }
}
```


## Issues and Resolutions
 This section will list all major issues encountered and their resolution.

* STILL BEING WORKED ON

* Issue: a parent can also be a student, but I shouldn't have to create a document for a parent if they are a student, like there shouldn't be a duplicate of a parent as well as a student for the same person. it should reference the same account. I'm not sure how to go about that yet.
   * A student can also be a guardian of other students
   * but there are guardians that are not students

* ISSUE: My routes were hanging and it was because I removed the connection to Mongodb. I didn't realized that although the variable ``` const db = require('../db/index'); ``` was not being used, it still calls the database info.
  
* ISSUE: Whenever I used the .populate() function, it would return a 404.
REF: [Link](https://mongoosejs.com/docs/populate.html)
```         
const findGuardian = await Guardian.findById(req.params.id).populate("students");
```
The issue was in my Schema for guardian and student. I had this:

```
        students:[{
            type: Schema.Types.ObjectId,
            ref: 'students',
            required: true
        }]
```
and so that Mongoose would add another s to 'students' which made the reference 'studentss'. I deleted fixed my references according to the documentation which is:
```
        students:[{
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        }]
```
Then I deleted my database and started from scratch


* ISSUE: my crearteGuardian wasn't working and I realized it was because certain parts would skip ahead and not wait for things speaking to the database.

```
const createGuardian = async (req,res) => {
    try{
        const guardianReqBody = req.body;
        //iterate through students arr
        guardianReqBody.students.forEach( async student => {
            //split full name to firstName and lastName
            const nameSplit = student.split(" ");
            console.log('nameSplit', nameSplit)

            //find student document with matching name
            let studentDoc = await Student.find({
                $and: {
                    firstName: nameSplit[0],
                    lastName: nameSplit[1]
                }
            })

            console.log('studentDoc', studentDoc._id);

            // replace name in list of students with student ID in guardian
            student = studentDoc._id;    
        })
        console.log('guardianReqBody', guardianReqBody);

        //create Guardian
        const newGuardian = await Guardian.create(guardianReqBody);

        guardianReqBody.students.forEach( async student => {
            //find student document with matching name
            let studentDoc = await Student.findOne({
                $and: {
                    firstName: nameSplit[0],
                    lastName: nameSplit[1]
                }
            })

            //push Guardian ID to student.guardians array
            await studentDoc.guardians.push(newGuardian._id);
            await studentDoc.save()
        })

        // const allGuardians = await Guardian.find({}).sort({firstName:1});
        res.status(200).json(newGuardian);
    }catch(error){
        res.status(400).send(error);
    }
}

```

I learned that for each loops cannot work with async or await. Instead a map function would do. This runs things in parallel, but I also realized that my student = studentDoc._id line was not updating the value in the guardianReqBody variable.
REF: [Link](https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop?answertab=active#tab-top)

```
//iterate throughstudents arr
        await Promise.all(guardianReqBody.students.map(async (student) => {
            //split full name to firstName and lastName
            const nameSplit = student.split(" ");
            console.log('nameSplit', nameSplit)

            //find student document with matching name
            let studentDoc = await Student.find({
                $and: [
                    {firstName: nameSplit[0]},
                    {lastName: nameSplit[1]}
                ]
            })

            console.log('studentDoc', studentDoc);

            // replace name in list of students with student ID in guardian
            student = studentDoc._id;    
        }))
        console.log('guardianReqBody', guardianReqBody);

        //create Guardian
        const newGuardian = await Guardian.create(guardianReqBody);

```



* ISSUE: When deploying backend to heroku and running, error appears
* RESLOVE: fixed variable on heroku

```
2020-08-05T05:07:33.888736+00:00 app[web.1]: Error: Cannot find module '../models/student.js'
2020-08-05T05:07:33.888736+00:00 app[web.1]: Require stack:
2020-08-05T05:07:33.888737+00:00 app[web.1]: - /app/controllers/index.js
2020-08-05T05:07:33.888737+00:00 app[web.1]: - /app/routes/index.js
2020-08-05T05:07:33.888738+00:00 app[web.1]: - /app/server.js
```
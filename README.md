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

Link to final project: <b>WILL ADD LATER<b>

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
  billing: {
    plan: /// 1 month, 6 months, 1 year
    start date: 
    reneweal date:
    monthly due date:
    monthly fee:
    past due: // true or false
    past due balance:
    current balance: 
    is insured: // true or false
    insurance renewal date:
  }
  attendance: ?? might remove
  parent/guardian: []
}

Parent Schenma
{
  first name:
  last name:
  cell number:
  home number:
  email:
  address:
  prefferred communication: {
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
| Initial Setup/ boilerplate code            | H        | 1hr            | -hr            | -hr         |
| Seed Data                                  | H        | 1hr            | -hr            | -hr         |
| Create Models for students                 | H        | 1hr            | -hr            | -hr         |
| Create Models for parents                  | H        | 1hr            | -hr            | -hr         |
| Create Controller for students             | H        | 1hr            | -hr            | -hr         |
| Create Controller for parents              | H        | 1hr            | -hr            | -hr         |
| Create Routes for students                 | H        | 1hr            | -hr            | -hr         |
| Create Routes for parents                  | H        | 1hr            | -hr            | -hr         |
| Create Models for students                 | H        | 1hr            | -hr            | -hr         |
| Create Models for parents                  | H        | 1hr            | -hr            | -hr         |
| Test routes for students                   | H        | 2hr            | -hr            | -hr         |
| Test routes for parents                    | H        | 2hr            | -hr            | -hr         |
| Total                                      |          | 14hrs          | -hr            | -hr         |


## Additional Libraries
 This section lists all supporting libraries and their role in the project.
 * [express](http://expressjs.com/) - A framework for bode that allows users to write handlers for requests with different HTTP verbs at different URL paths (routes)
 * [mongoose](https://mongoosejs.com/docs/2.7.x/index.html) - An Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
 * [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) - a node package for providing a [Connect](https://github.com/senchalabs/connect#readme)/[Express](http://expressjs.com/) middleware that can be used to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (cross-origin resource sharing) with various options. It is used for security.
 * [dotenv](https://www.npmjs.com/package/dotenv) - A module that loads environment variables used for configuration
 * [morgan](https://www.npmjs.com/package/morgan) - A HTTP request logger middleware for node.js


## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

* STILL BEING WORKED ON


## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

* STILL BEING WORKED ON

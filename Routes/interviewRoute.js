const express = require('express');
const Interview = require('../Controller/interviewController');
const validateInterview = require('../Middleware/interviewMiddleware');
const interviewRouters = express.Router();

interviewRouters.get('/', Interview.interviewbanksAll);
interviewRouters.get('/:id', Interview.interviewbanksId).put('/:id', validateInterview, Interview.interviewbanksEdit);
interviewRouters.delete('/delete/:id', Interview.interviewbanksDelete);
interviewRouters.post('/insert/data', validateInterview, Interview.interviewbanksInsert);

module.exports = interviewRouters;







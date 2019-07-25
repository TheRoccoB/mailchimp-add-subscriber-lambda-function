'use strict';

const addSubscriber = require('./addSubscriber');

exports.handler = async (event) => {

  let email, fname, lname;
  if (event.queryStringParameters){
    email = event.queryStringParameters.email;
    fname = event.queryStringParameters.fname;
    lname = event.queryStringParameters.lname;
  }
  if (typeof email === 'string' && typeof fname === 'string' && typeof lname === 'string'){
    console.log('2');

    return await addSubscriber(
      event.queryStringParameters.email,
      event.queryStringParameters.fname,
      event.queryStringParameters.lname)
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      error : `missing parameters: Expected: email, fname, lname; got ${email}, ${fname}, ${lname}`
    })
  }
}

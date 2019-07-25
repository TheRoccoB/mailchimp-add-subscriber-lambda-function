const axios = require('axios');



// datacenter id. find by logging in to mailchimp. ex: https://us19.admin.mailchimp.com/ => us19
const DC = 'us19';

// create one in mailchimp: Extras => API Keys
const KEY = 'YOUR_API_KEY';

// your audience id: https://mailchimp.com/help/find-audience-id (looks like 12341916e5)
const LIST_ID = 'YOUR_AUDIENCE_ID';

module.exports = async (email, fname, lname, skipLogs = false) => {
  const API_URL = `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;
  try{
    const params = {
      "email_address": email,
      "status": "subscribed",
      "merge_fields": {
        "FNAME": fname,
        "LNAME": lname
      }
    }

    const auth = {
      username: 'any',
      password: KEY
    }

    const response = await axios.post(API_URL, params, {auth});

    // this can be helpful to debug the response, but can get quite verbose:
    // console.log(response && response.data);

    const msg = `adding ${email}`;

    if (!skipLogs){
      console.log(msg);
    }

    return {statusCode: 200, body: JSON.stringify({success: msg})};

  }
  catch(e){
    let errorData = {unknownError: true};
    if (e.response && e.response.data){
      errorData = e.response.data;
    }
    if (!skipLogs){
      console.log('error adding user to the list', errorData);
    }
    return {
      statusCode: 400,
      body: JSON.stringify(errorData)
    }
  }
}



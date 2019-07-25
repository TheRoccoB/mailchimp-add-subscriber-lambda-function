# Example webhook for adding Mailchimp subscribers using AWS Lambda

This is an example of how to create a REST function for lambda that will add subscribers to a mailchimp list.

I'm personally using this for a webhook where the URL is only known by my backend server, so I'm not doing any sort of authentication in this example.

## Setup

`git clone` this project from Github. Modify the following lines of `addSubscriber.js`:

```
// datacenter id. find by logging in to mailchimp. ex: https://us19.admin.mailchimp.com/ => us19
const DC = 'usXX';

// create one in mailchimp: Extras => API Keys
const KEY = 'MAILCHIMP_API_KEY';

// your audience id: https://mailchimp.com/help/find-audience-id
// usually a hexidecimal string 10 chars long
const LIST_ID = 'YOUR_LIST_ID';
```

WARNING: If you fork this to a public repo, make sure not to check in your API key :-).

Then run `npm install` to install dependencies.

## Test Locally 

You probably want to run `test.js`. It's not an entire test suite, but it will determine if you have set up your mailchimp
variables from `addSubscriber.js` correctly.

The file simply will add an email address to your mailing list:

```
// ...
addSubscriber("someone@someemail.com", "Rocco", "Balsamo");
// ...
```

Then run it: 

```
node test.js
```

It should print out a success or error message. If it succeeded, you should verify that the email was added to the list
in your mailchimp console. 

## Deploy

This is a quick-and-dirty method for deploying this lambda function where you will upload code directly to the AWS 
console via a zip file. There are better ways to do it via command line, but this works without a ton of setup:

1. Follow this tutorial with some modifications [TUTORIAL: Build a Hello World API with Lambda Proxy Integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html)  
   * Instead of naming things `helloWorld`, you may want to name them `mailchimpAPI` or something similar
   * Use node.js 10.x runtime instead of 8.x that they recommend.
   * When they tell you to name the `stage`, you might want to put `prod` instead of `test`
   * If you want this code accessible from your frontend, you may want to enable CORS, but I have not tested this.    
2. Make sure the helloWorld function works for you when calling via curl or the browser.
3. Zip up this code directory, making sure `index.js` and other files are in the top level of the zip file, not a subdirectory.
4. In the your Lambda function on the AWS console, in the "Function Code" section, pull down the "Code Entry Type" dropdown and select "upload a zip file". Upload your zip.  
5. Your API endpoint will look something like this: `https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/prod/mailchimpAPI`

Make sure that you can add a user to the list via an endpoint. Your request should look similar to this.

https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/prod/mailchimpAPI?email=someone%40somewhere.com&fname=First&lname=Last

(%40 is uri encoding for @)

## Plugs
That's pretty much it! If you liked this example, star it or say hello on [twitter](https://twitter.com/simmer_io)! Also check out a website that I run for WebGL games, https://simmer.io.

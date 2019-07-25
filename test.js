const addSubscriber = require('./addSubscriber');

const test = async () => {
  try{
    const response = await addSubscriber("someone2@someemail.com", "Rocco", "Balsamo", true);
    console.log(response);
  }
  catch(e){
    console.log(e);
  }
}

test();


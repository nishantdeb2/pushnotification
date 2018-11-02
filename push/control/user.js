const services = require('../services');
const async = require('async');

module.exports={
  sendpush :async(body)=>{
    try{
  // console.log(body);
    let a= await services.user.sendpush(body);
    //console.log(a.ops);
    return a;

  }
  catch(err)
  {
    throw(err);
  }
  }

  }

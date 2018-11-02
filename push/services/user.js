
const database = require('../db');
const async = require('async');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const mongooes = require('mongoose');
const JWT  = require('jsonwebtoken');
const secret = 'NeverShareYourSecret';
const jwtDecode = require('jwt-decode');
const constant= require('../constant').errorMessage.eng;
const statuss = require('../constant').successmessage.eng;
// var FCM = require('fcm-node');
var FCM = require('fcm-push');
var _ =require('underscore')
var serverKey = 'AAAA07-2ryY:APA91bHKg-31TaP0EJdO0sSCyYIIDEZxEpO1WXK1HBSJmUEm3QdvzgG1ZBHSvDdwlLk5d5cZtwIND6n1aFsLBYjZZIP89oFoOr8DO3uYLlFKUQaeXaWg2YHvK83pHoImfAO1r-D96aVt'; //put your server key here
var fcm = new FCM(serverKey);





module.exports={
  sendpush:async (data)=>
  { try{
    let devicetokenIOS=[]
    let devicetokenAND=[]
    let datatoinsert = []

    const collection=db.collection('user');

    let idd = await collection.find({}).sort({pushid :-1}).toArray()
    id = idd[0].pushid
    var res = id.split("_");

for(i=0;i<data.devicetype.length;i++)
{ var obj ={}
  id = parseInt(res[1])+1+i
  pushid = "PUSH_"+ id
  obj.pushid=pushid
  obj.bookingId = data.bookingId
  obj.message =data.message
  obj.devicetoken = data.devicetoken[i]
  obj.devicetype = data.devicetype[i]
  obj.isread = 0
  obj.createdAt = new Date()
  datatoinsert.push(obj)

  if(data.devicetype[i] == 0)
  devicetokenAND.push(data.devicetoken[i])
  else {
    devicetokenIOS.push(data.devicetoken[i])
  }
}
console.log("and",devicetokenAND);
console.log("ios",devicetokenIOS);

       await collection.insert(datatoinsert,(err,res)=>{
         console.log("...................",res,err)
         if (err)
         {
           throw constant.insert
         }

       });


       if (devicetokenIOS.length != 0)
       { // for ios push
 const chunks = _.chunk(devicetokenIOS, 1000);
         _.map(chunks, (e) => {
          var message = {
              registration_ids: e,

              notification: {
                  title: 'hello',
                  body:  "data.message"
              },

          };

          fcm.send(message, function(err, response){
              if (err) {

                  console.log("Something has gone wrong ios !!!!!!!!!!!1!",err);
                  return err
              } else {
                  console.log("Successfully sent with response: ", response);
                  return response
              }
          });

});



       }
     if( devicetokenAND.length != 0)
       {
         // for androd push
         // var message = {
         //     registration_ids: devicetokenAND,
         //
         //     notification: {
         //         title: 'hello',
         //         body:  "data.message"
         //     },
         //
         //
         // };
         //
         // fcm.send(message, function(err, response){
         //     if (err) {
         //         console.log("Something has gone wrong and !",err);
         //     } else {
         //         console.log("Successfully sent with response: ", response);
         //     }
         // });

         const chunksAND = _.chunk(devicetokenAND, 1000);
                 _.map(chunksAND, (e) => {
                  var message = {
                      registration_ids: e,

                      notification: {
                          title: 'hello',
                          body:  "data.message"
                      },

                  };

                  fcm.send(message, function(err, response){
                      if (err) {

                          console.log("Something has gone wrong and !!!!!!!!!!!!",err);
                          return err
                      } else {
                          console.log("Successfully sent with response: ", response);
                          return response
                      }
                  });

        });


       }
 response ={
   status :200,
   message :"push send "
 }
 return response
    }
    catch(err)
    {
      throw(err);
    }
  }
}

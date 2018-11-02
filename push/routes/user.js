const Joi = require('joi');
const path = require('path');

const JWT         = require('jsonwebtoken');
//const fs = require('fs');
const secret = 'NeverShareYourSecret';
const control = require('../control');

module.exports=[

{   method: 'POST',
    path: '/sendpush',
    config: {

          validate: {
            payload:{
              devicetoken:Joi.array().required(),
              devicetype:Joi.array().required(),
              message:Joi.string().required(),
              bookingId:Joi.string().required()
              // bokingID:Joi.string().required() to auto generate


            }
              },
        },
        handler: function (request, h){
        try{
          let a=  control.user.sendpush(request.payload);
            return a
          }
          catch(err)
          {
          throw(err);
          }
          }
}
]

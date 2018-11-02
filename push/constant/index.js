const Boom = require('boom')

module.exports = {
    //version: "/v1",

    errorMessage: {
        eng: {
          
            insert:Boom.expectationFailed("error in insert")


        }
    },
    successmessage:{
      eng:{
         status:200,
         message:"success"
      }

    }

}

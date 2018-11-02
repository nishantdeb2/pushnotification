
module.exports={
collection:()=>{
db.createCollection("user", {
   // validator: {
   //    $jsonSchema: {
   //       bsonType: "object",
   //       required: [ "user", "devicetoken","isread"],
   //       properties: {
   //          booking: {
   //             bsonType: "string",
   //             description: "must be a string and is required"
   //          },
   //          devicetoken: {
   //             bsonType: "array",
   //             description: "must be a array and is required"
   //          },
   //          message:{
   //            bsonType : "string",
   //            description: "must be a string and is required"
   //          },
   //          isread:{
   //            bsonType : "boolean",
   //            description: "must be a string and is required"
   //          }
   //       }
   //    }
   // }
   // ,
   // validationLevel:'off',
   // validationAction:'error'
})
}
}

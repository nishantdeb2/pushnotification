const Hapi = require('hapi');
const routes = require('./routes');
const connection = require('./db.js')
const server = Hapi.server({ port: 3030, host: 'localhost' });

const init = async () => {
  try{
  await connection.connect();
    }
    catch(err){
  throw(err);
  }
  try{
    console.log(",,,,,,,,,,,,,,,,,,,");
  await server.start();
    }
catch(err){
    throw(err);
  }
    console.log(`Server running at: ${server.info.uri}`);

};
init();
server.route(routes);

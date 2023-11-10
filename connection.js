const mongoose = require('mongoose');

async function connectToMongoDB(url){
     return mongoose
     .connect(url)
     .then(()=>console.log("mongod connected"))
     .catch((err)=>console.log(err));
}

module.exports={
     connectToMongoDB,
}
const mongoose = require("mongoose")
const dburl = 'mongodb://localhost:27017/contora'
const connectDB = async () => {
    await mongoose.connect(dburl, {
        useNewUrlParser : true,
        useUnifiedTopology: true,
        family: 4
          
    }).then(data => {
        console.log(`mongodb is conected at ${data.connection.host}`);
    })
    .catch(err =>{
        console.log(err);
    })
}
module.exports = connectDB;
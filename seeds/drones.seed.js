// Iteration #1
const drone = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];

const mongoose = require("mongoose"); 
const droneModel = require("./../models/Drone.model.js")

mongoose
    .connect("mongodb://localhost/lab-express-drones", {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false,
        useCreateIndex: true
    })

    .then(async(x)=>{
        console.log(`connected to Monto Database name:${x.connections[0].name}`);

        const res = await droneModel.insertMany(drones); 
        console.log(res.length + "drones inserted in database!") // nb of drones created

    })
    .catch((err) => console.error("Error connnecting to Mongo", err));
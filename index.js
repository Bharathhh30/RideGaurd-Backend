const express = require("express")
const {mongoose} = require("mongoose")
const cors = require("cors")
require('dotenv').config()
const EmergencyInfo = require('./models/EmergencyInfoModel');


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const corsOptions = {
    origin: "*", // Allow only frontend running on port 5174 (now allow from everywhere)
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies or authentication headers
  };
app.use(cors(corsOptions))

app.get('/',(req,res)=>{
    res.json({
        message : "Hellow  i am working no worries"
    })
})

app.post('/api/emergencyinfo',async(req,res)=>{
    try{
        // const saved = req.body
        const newInfo = new EmergencyInfo(req.body)
        const saved = await newInfo.save();
        res.status(201).json({
            message : saved
        })
    }catch(err){
        console.log('err at post',err)
        res.status(500).json({
            error : err
        })
    }
})

app.get('/api/emergencyinfo/:email', async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email).toLowerCase();
    const info = await EmergencyInfo.findOne({ email });

    if (!info) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(info);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch emergency info' });
  }
});


async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    console.log(process.env.MONGO_URL)
    app.listen(3000);
    console.log("starteddd")

}

main()
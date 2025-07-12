const express = require("express")
const {mongoose} = require("mongoose")
const cors = require("cors")
require('dotenv').config()
const EmergencyInfo = require('./models/EmergencyInfoModel');
const upload = require("./middleware/upload");


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

app.post('/api/emergencyinfo', upload.single('photo'), async (req, res) => {
  try {
    const {
      fullName,
      email,
      bloodType,
      emergencyContact,
      allergies,
      medications,
      medicalConditions,
      dateOfBirth,
      address,
      phoneNumber,
    } = req.body;

    const photoUrl = req.file?.path || ''; // Cloudinary URL

    const newInfo = new EmergencyInfo({
      fullName,
      email,
      bloodType,
      emergencyContact,
      allergies,
      medications,
      medicalConditions,
      dateOfBirth,
      address,
      phoneNumber,
      photo: photoUrl, // Save photo URL to DB
    });
    console.log(newInfo)
    const saved = await newInfo.save();

    res.status(201).json({ message: saved });
  } catch (err) {
    console.error('err at post', err);
    res.status(500).json({ error: err });
  }
});

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
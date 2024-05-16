console.clear();
import express from "express";
import mongoose from "mongoose";
import Contact from "./Models/contactForme.js";
import bodyParser from "body-parser";
const app = express();
const PORT = 5000;

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//end

// connect to DB
mongoose
  .connect("mongodb://localhost:27017/contact")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB not connected error : ", err));
//end connect



//CRUD
//GET method 
app.get("/", async(req, res) => {
    try {
        const allData = await Contact.find()
        res.status(200).send({ msg: "all contacts ", allData });
    } catch (error) {
        res.status(500).send({ msg: "invalid request", error }); 
    }
  });
//end GET
//Post method
app.post("/add", (req, res) => {
  console.log(req.body);
  try {
    const newContactList = new Contact(req.body);
    newContactList.save();
    res
      .status(200)
      .send({ msg: "new contact added successfully", newContactList });
  } catch (error) {
    res.status(500).send({ msg: "invalid request", error });
  }
});
//end post


//find person by his id
app.get("/:id", async(req,res)=>{
  try {
    const oneContact=await Contact.findOne({_id: req.params.id})
    console.log(oneContact)
  } catch (error) {
    res.status(500).send({msg: "invalid request",error})
  }
})
//end find

//get all person which age >18
app.get("/condition", async(req,res)=>{
  try {
    const allContact= await Contact.find({age :{$gt: req.body.age}})
    res.status(200).send({msg: "all contact grate than ${req.body.age} it's:",allContact });
  } catch (error) {
    res.status(500).send({msg: "invalid request",error})
  }
})

//end get age
// end CRUD

app.listen(PORT, (err) => {
  if (err) throw console.log("error serveur ", err);
  console.log(`Server is running on http://localhost:${PORT}`);
});

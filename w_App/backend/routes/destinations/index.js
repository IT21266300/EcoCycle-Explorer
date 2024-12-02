//insert
import express from 'express';
import Destination from '../../models/destinationModel/destination.js';

const router = express.Router();


router.route("/add").post((req,res)=>{

    const destination = req.body.destination;
    const description = req.body.description;
    const latitude = req.body.longitude;
    const longitude = req.body.longitude;

    const newDestination = new Destination({
        destination,
        description,
        latitude, 
        longitude
    })

    newDestination.save().then(()=>{
        res.json("New Destination Added")
    }).catch((err)=>{
        console.log(err);
    })
})


//read

router.route("/").get((req,res)=>{
    Destination.find().then((destinations)=>{
        res.json(destinations)
    }).catch((err)=>{
        console.log(err)
    })
})

//update

// router.route("/update/:id").put(async (req,res)=>{
//     let userId = req.params.id;
//     const {name,nic,address,phone,staffId,siteId,email} = req.body;

//     const updateStaff = {
//         name,
//         nic,
//         address,
//         phone,
//         staffId,
//         siteId,
//         email
//     }

//     const update = await Staff.findByIdAndUpdate(userId,updateStaff).then(()=>{
//         res.status(200).send({status: "Updated"})
//     }).catch((err)=>{
//         console.log(err);
//     })  
// })

// //delete

// router.route("/delete/:id").delete(async (req,res)=>{
//     let userId = req.params.id;

//     await Staff.findByIdAndDelete(userId).then(()=>{
//         res.status(200).send({status: "Delete"})
//     }).catch((err)=>{
//         console.log(err);
//     })  

// })

// module.exports = router;
export default router;






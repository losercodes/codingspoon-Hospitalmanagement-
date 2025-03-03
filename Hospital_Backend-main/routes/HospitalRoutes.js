const express = require("express");
const {
    createHospital,
    getHospitalsByCity,
    deleteHospital,
    updateHospital,
    getHospitalDetails
} = require("../controllers/HospitalController");

const { authMiddleware, adminMiddleware } = require("../middleware/middleware");

const router = express.Router();

router.post("/create", authMiddleware, createHospital);
router.get("/", getHospitalsByCity);
router.get("/details/:id", getHospitalDetails);
router.put("/update", authMiddleware, updateHospital); 
router.delete("/delete", authMiddleware, adminMiddleware, deleteHospital); 

module.exports = router;

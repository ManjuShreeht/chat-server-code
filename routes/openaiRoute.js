const express=require("express");
const { summary, paragraph, chatbot, jsconverter, scifiImage } = require("../controllers/openaiController");


const router=express.Router();

router.post('/summary',summary);
router.post('/paragraph',paragraph);
router.post('/chatbot',chatbot);
router.post('/js-converter',jsconverter);
router.post('/scifiImage',scifiImage);

module.exports=router
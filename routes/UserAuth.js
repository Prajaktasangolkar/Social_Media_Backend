const express=require('express')
const router=express.Router()
const {registerUser,loginUser}=require('../Controller/UserAuthentication.js')

// router.get('/',async(req,res)=>{
//     console.log('hiii');
//     res.send('Auth route')
// });

router.post('/register',registerUser)
router.post('/login', loginUser)

module.exports=router;
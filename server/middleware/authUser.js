import jwt from 'jsonwebtoken'

export const authUser = (req,res,next)=>{
    try {
        const {token} = req.cookies 
        if(!token){
           return res.status(400).json({message:"user not authorized"})
        }
        const tokenVerify = jwt.verify(token,process.env.JWT_SECRET_KEY ) 
        if(!tokenVerify){
            return res.status(400).json({message:"user not authorized"})
        }
         req.user = tokenVerify

         next()
         
         
    } catch (error) {
         return res
      .status(error.status || 500)
      .json({ error: error.message || "internal server error" });
    }
}
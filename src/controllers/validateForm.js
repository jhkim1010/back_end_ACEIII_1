const Yup = require("yup"); 

const formSchema = Yup.object({
    username: Yup.string()
      .required("Username required")
      .min(4, "Username too short")
      .max(28, "Username too long"),
    pwd: Yup.string()
      .required("Password required")
      .min(4, "Password too short")
      .max(28, "Password too long"),
  }); 
  
  module.exports = {formSchema}; 
const validateForm = (req, res) => {
    const formData = req.body; 
    console.log(formData); 
    formSchema.validate(formData).catch(err => {
        res.status(422).send(); 
        console.log(err.errors); 
    }).then(valid => {
        if(valid) {
            console.log("form is good... ")
        }
        res.status(200).json({
            ok : true,
            status : 200});
        })

}


module.exports =  validateForm
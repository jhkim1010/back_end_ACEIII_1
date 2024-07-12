const express = require("express");
const router = express.Router();
const Yup = require("yup");
// const validateForm = require("../controllers/validateForm")
const Users = require('../models/user');
const Companies = require('../models/company')
const bcrypt = require('bcrypt')
// const bcrypt 3

router.get("/login", async (req, res) => {
    console.log("Entered Login Señal to GET")
    // validateForm(req, res); 

});

// async function check_company_name(companyname1) {
//     const existing_companies = await Companies.findOne({
//         where: {
//             is_blocked: false,
//             companyname: companyname1
//         }
//     })

//     let resp = (existing_companies) ? existing_companies.id_company : -1;
//     // console.log(`Check company info ${companyname1} id_company : ${resp}`); 
//     return resp;
// }

router.post("/login", async (req, res) => {
    console.log("Entered Login Señal to PUT")
    // validateForm(req, res); 
    // 
    id_company = req.body.username;
    const user_name = id_company.split("@")[0]
    const company_name = id_company.split("@")[1]
    console.log(user_name, company_name);

    // 먼저 회사 정보가 존재하는지 확인한다. 
    const id_checkCompany = await Companies.findOne({
        where: {
            is_blocked: false,
            companyname: company_name
        }
    })

    if (id_checkCompany == -1) {
        res.status(400).send("No Exist your company... ")
    }

    // 회사가 존재하는 경우 이제 이미 존재하는 사용자인지 조사한다. 

    const existingUsers = await Users.findOne({
        where: {
            is_blocked: false,
            username: user_name
        }
    })

    if (existingUsers) {
        res.status(400).send("Already Exist your username... ")
    }
});

router.post('/signup', async (req, res) => {

    console.log("Entered Sign Up Señal")
    // validateForm(req, res); 

    const username_company = req.body.username;
    const password = req.body.pwd; 
    let hashedpassword = await bcrypt.hash(password, 12)
    const user_name = username_company.split("@")[0]
    const company_name = username_company.split("@")[1]
    console.log(user_name, company_name);

    // 먼저 회사 정보가 존재하는지 확인한다. 
    let a_company = await Companies.findOne({
        where: {
            is_blocked: false,
            companyname: company_name
        }
    })

    console.log(hashedpassword)

    if (a_company.id_company == -1) {
        res.status(400).send("No Exist your company... ")
    }
    else console.log(a_company.id_company)

    // 회사가 존재하는 경우 이제 이미 존재하는 사용자인지 조사한다. 

    const existingUsers = await Users.findOne({
        where: {
            is_blocked: false,
            username: username_company
        }
    })

    if (existingUsers) {
        res.status(400).send("Already Exist your username... ")
    }
    else {
        // user, password 정보를 이용해서 생성해준다. 
        let a_new_user = await Users.create({
            username: username_company,
            password : hashedpassword, 
            ref_id_company: a_company.id_company,
            priority: 1
        })

        res.status(200).json({
            ok : true , 
            status : 200, 
            body : a_new_user
        })
        console.log(`New user ${a_new_user.username} was created with id ${a_new_user.id_user}`)
    }

});

module.exports = router;

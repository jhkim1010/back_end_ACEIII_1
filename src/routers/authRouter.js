const express = require("express");
const router = express.Router();
const Yup = require("yup");
// const validateForm = require("../controllers/validateForm")
const Users = require('../models/user');
const Companies = require('../models/company')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { createToken , validateToken} = require('./JWT');

// const verifyJWT = require('./verifyJWT')
// const bcrypt 3

router.get("/users", validateToken, async (req, res) => {
    console.log("Entered Login Señal to GET")
    // validateForm(req, res); 
    res.status(200).json({
        ok : true, 
        status : 200, 
        body : "U are authentificated well..."
    })

});

const msg_for_client = async (id_company) => {
    const a_company = await Companies.findOne({
        where: {
            id_company : id_company
        }
    })

    // console.log(a_company.msg_for_client); 

    return a_company.msg_for_client
}

// const verifyJWT = (req, res, next) => {
//     const token = req.headers['x-access-token'];

//     if(!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     } else {
//         jwt.verify(token, process.env.JWT_SECRET_KEY , (err, decoded) => {
//             if(err) {
//                 return res.status(401).json({ message: 'Invalid token' });
//             }
//             req.userId = decoded.id;
//             next();
//         });
//     }
// }


// router.post("/isUserAuth",  async (req, res) => {
//     res.send("U are authentificated well...")
// });

router.post("/login", async (req, res) => {
        console.log("Entered Login Señal to PUT")
        // validateForm(req, res); 
    // 
    const user_name = req.body.username;
    const password = req.body.pwd;

    console.log(user_name, password)

    try {
        // 사용자 이름으로 사용자 검색
        const existingUsers = await Users.findOne({
            where: {
                is_deleted : false,
                username: user_name
            }
        })

        console.log(existingUsers)

        if (!existingUsers) {
            res.json({ status: 400, ok: false, userID : -1, companyID : -1, message: "NOT Exist your username... "})
        }

        // bcrypt를 사용하여 제출된 패스워드와 해시된 패스워드 비교
        const match = await bcrypt.compare(password, existingUsers.password);

        if (match) {
            const msg = await msg_for_client(existingUsers.ref_id_company); 
            console.log(`msg : ${msg}`)
            const token = createToken(existingUsers); 

            res.cookie('access-token', token, {
                secure: false,
                maxAge: 8 * 60 * 60 * 1000 // 8시간
            });
            res.cookie('username', existingUsers.username, {
                secure: false,
                maxAge: 8 * 60 * 60 * 1000 // 8시간
            });
            res.cookie('user-id', existingUsers.id_user, {
                secure: false,
                maxAge: 8 * 60 * 60 * 1000 // 8시간
            });
            res.cookie('company-id', existingUsers.ref_id_company, {
                secure: false,
                maxAge: 8 * 60 * 60 * 1000 // 8시간
            });
            res.json({ 
                ok : true, 
                status : 200, 
                token : token, 
                username : existingUsers.username,
                userID : existingUsers.id_user,
                companyID : existingUsers.ref_id_company, 
                msg_for_client : msg
            }); 
        } else {
            res.status(401).send("패스워드가 일치하지 않습니다.");
        }
    } catch (error) {
        console.error("로그인 에러:", error);
        res.status(500).send("서버 에러 발생");
    }

});

router.post('/signup', async (req, res) => {

    console.log("Entered Sign Up Señal")
    // validateForm(req, res); 

    const username_company = req.body.username;
    const password = req.body.pwd; 
    const hashedpassword = await bcrypt.hash(password, 12)
    const user_name = username_company.split("@")[0]
    const company_name = username_company.split("@")[1]
    console.log(user_name, company_name);

    console.log(password, hashedpassword)
    // 먼저 회사 정보가 존재하는지 확인한다. 
    let a_company = await Companies.findOne({
        where: {
            is_deleted: false,
            companyname: company_name
        }
    })

    if (a_company.id_company == -1) {
        res.status(400).send("No Exist your company... ")
    }
    else console.log(a_company.id_company)

    // 회사가 존재하는 경우 이제 이미 존재하는 사용자인지 조사한다. 
    const existingUsers = await Users.findOne({
        where: {
            is_deleted: false,
            username: username_company
        }
    })

    if (existingUsers) {
        res.status(400).send("Already Exist your username... ")
    }
    else {
        console.log(password, hashedpassword)
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

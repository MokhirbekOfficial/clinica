const { addUsers, getUsers} = require('./model')
const secret_key = 'CLINICS'
const jwt = require('jsonwebtoken')

module.exports = {
    addusers: async (req, res) => {
        try{
            let {user_name, user_password,user_gmail,user_tel,is_admin} = req.body
            await addUsers(user_name, user_password,user_gmail,user_tel,is_admin)
            const token = jwt.sign({user_name, user_gmail}, secret_key)
            res.json(token)
        }catch(e){
            console.log(e.message)
            res.json(false)
        }
    },
    checkuser: async (req, res) => {
        try{
            let {user_name, user_password} = req.body
            let allUsers = await getUsers()
            for(let i=0; i<allUsers.length; i++){
                if((allUsers[i].user_name == user_name) && (allUsers[i].user_password == user_password)){
                    let userName = allUsers[i].user_name
                    let userGmail = allUsers[i].user_gmail
                    const token = jwt.sign({userName, userGmail}, secret_key)
                    let obj = {
                        token: token,
                        isAdmin: allUsers[i].is_admin
                    }
                    return res.json(obj)
                }
            }
            res.json('false')
        }catch(e){
            console.log(e.message)
            res.json(false)
        }
    }
}
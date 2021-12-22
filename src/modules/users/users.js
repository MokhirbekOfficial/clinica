const { addUsers, getUsers, addOrder, getAllOrders, serviceOrders, getOneUser, getOneService, getAdmin} = require('./model')
const {getAdminId} = require('../admin/model')
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
                    let user_name = allUsers[i].user_name
                    let user_gmail = allUsers[i].user_gmail
                    const token = jwt.sign({user_name, user_gmail}, secret_key)
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
    },
    addOrder: async (req, res) => {
        try{
            let {service_id, token} = req.body
            const decoded = jwt.verify(token, secret_key)
            let foundId = await getAdminId(decoded.user_name)
            await addOrder(service_id, foundId.user_id)
            res.json("ok")
        }catch(e){
            console.log(e.message)
            res.json(false)
        }
    },
    getOrder: async (req, res) => {
        try{
            let newOrders = []
            let {token} = req.body
            const decoded = jwt.verify(token, secret_key)
            let foundId = await getAdminId(decoded.user_name)
            let userOrders = await getAllOrders(foundId.user_id)
            for(let i = 0; i<userOrders.length; i++){
                let number = 1
                let servOrder = await serviceOrders(userOrders[i].order_service)
                for(let j=0; j<servOrder.length; j++){
                    if(userOrders[i].order_id == servOrder[j].order_id){
                        break;
                    }
                    number++
                }
                let obj = {
                    order_id: userOrders[i].order_id,
                    order_service: userOrders[i].order_service,
                    order_owner: userOrders[i].order_owner,
                    order_time: userOrders[i].order_time,
                    order_number: number
                }
                newOrders.push(obj)
            }
            let senderObj = []
            for(let i=0; i<newOrders.length; i++){
                let userInfo = await getOneUser(newOrders[i].order_owner)
                let serviceInfo = await getOneService(newOrders[i].order_service)
                let obj = {
                    order_id: newOrders[i].order_id,
                    user_name: userInfo.user_name,
                    service_title: serviceInfo.service_title,
                    service_img: serviceInfo.service_img,
                    order_time: newOrders[i].order_time,
                    doctor_name: serviceInfo.doctor_name,
                    doctor_tel: serviceInfo.doctor_tel,
                    order_number: newOrders[i].order_number
                }
                senderObj.push(obj)
            }
            res.json(senderObj)
        }catch(e){
            console.log(e.message)
            res.json(false)
        }
    },
    getAdmin: async (req, res) => {
        try{
            let admins = await getAdmin()
            res.json(admins)
        }catch(e){
            console.log(e.message)
            res.json(false)
        }
    }
}
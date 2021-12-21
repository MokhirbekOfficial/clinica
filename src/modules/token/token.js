const { tokenchecker } = require('./model')
const secret_key = 'CLINICS'
const jwt = require('jsonwebtoken')

module.exports = {
    tokenchecker: async (req, res) => {
        try{
            let {token} = req.body
            const decoded = jwt.verify(token, secret_key)
            let user = await tokenchecker(decoded.user_name)
            res.json(user.is_admin)
        }catch(e){
            console.log(e.message)
            res.json(false)
        }
    }
}
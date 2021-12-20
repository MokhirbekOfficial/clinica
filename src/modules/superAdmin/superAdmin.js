const { getUsers, getOrders, deleteUser, deleteOrder, deleteClinics} = require('./model')

module.exports = {
    getUsers: async(req, res) => {
        try {
            const allUsers = await getUsers()

            res.json(allUsers)
        } catch(e) {
            console.log(e.message)
            res.json(e.message)
        }
    },
    getOrders: async(req, res) => {
        try {
            const allOrders = await getOrders()
            res.json(allOrders)
        } catch(e) {
            console.log(e.message)
            res.json(e.message)
        }
    },
    deleteUser: async(req, res) => {
        try {
            let {user_id} = req.body
            await deleteUser(user_id)
            res.json('deleted')
        } catch(e) {
            console.log(e.message)
            res.json(e.message)
        }
    },
    deleteOrder: async(req, res) => {
        try {
            let {order_id} = req.body
            await deleteOrder(order_id)
            res.json('deleted')
        } catch(e) {
            console.log(e.message)
            res.json(e.message)
        }
    },
    deleteClinics: async(req, res) => {
        try {
            let {clinic_id} = req.body
            await deleteClinics(clinic_id)
            res.json('deleted')
        } catch(e) {
            console.log(e.message)
            res.json(e.message)
        }
    }
}
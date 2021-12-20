const { fetch, fetchAll } = require('../../lib/postgress')

const AddUsers = `
INSERT INTO users
    (user_name, user_password,user_gmail,user_tel,is_admin)
VALUES
    ($1,$2,$3,$4,$5)
`

const GetUsers = `
SELECT 
    *
FROM
    users
`

const addUsers = (user_name, user_password,user_gmail,user_tel,is_admin) => fetch(AddUsers,user_name, user_password,user_gmail,user_tel,is_admin)

const getUsers = () => fetchAll(GetUsers)
module.exports = {
    addUsers,
    getUsers
}
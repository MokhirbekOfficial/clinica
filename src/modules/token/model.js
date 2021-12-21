const { fetch, fetchAll } = require('../../lib/postgress')

const TokenChecker = `
SELECT 
    *
FROM
    users
WHERE 
    user_name = $1
`
const tokenchecker = (user_name) => fetch(TokenChecker, user_name)

module.exports = {
    tokenchecker
}
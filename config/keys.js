const {PORT,CONNECTION_URL,JWT_SECRET} = process.env;

module.exports = {
    PORT: PORT || 5000,
    connectionurl: CONNECTION_URL,
    jwtSecr:JWT_SECRET
};
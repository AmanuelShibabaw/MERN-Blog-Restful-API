const {PORT,CONNECTION_URL,JWT_SECRET,EMAIL_USER,EMAIL_PASS} = process.env;

module.exports = {
    PORT: PORT || 5000,
    connectionurl: CONNECTION_URL,
    jwtSecr:JWT_SECRET,
    myemail:EMAIL_USER,
    emailpass:EMAIL_PASS
};
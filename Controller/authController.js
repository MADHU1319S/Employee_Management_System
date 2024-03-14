const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Modelregister, ModelLogin } = require('../model/authModel');

exports.register = async (req, res) => {
    try {
        const { id, email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const filename = req.files ? req.files[0].filename : null;
        console.log(req.files);
        const userDetails = await Modelregister({ id, email, username, password: hashedPassword, filename });
        res.json(userDetails);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

exports.login = async (req, res) => {
    try {
        const userData = await ModelLogin(req.body);
        if (userData.length === 0) {
            return res.status(401).send('Invalid data');
        }
        const user = userData[0];
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid username or password');
        }
        const { username, password } = user; 
        const secretKey = 'madhu'; // This should ideally be stored in environment variables
        const token = jwt.sign({ username, password }, secretKey, { expiresIn: '1hr' });
        res.json(token);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

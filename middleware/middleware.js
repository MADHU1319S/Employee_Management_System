const jwt = require('jsonwebtoken');

const tokenVerification = (req, res, next) => {
    try {
        // Check if Authorization header is present
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        // Extract token from Authorization header (assuming it's in the format "Bearer <token>")
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, 'madhu');
        req.userData = decodedToken;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed', error });
    }
};

module.exports = tokenVerification;

const db = require('../db');

exports.Modelregister = (data) => {
    return new Promise((resolve, reject) => {
        const { id, email, username, password, filename } = data;

        const checkQuery = 'SELECT * FROM authentication1 WHERE email = ? OR username = ?';
        db.query(checkQuery, [email, username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve({ message: 'Data already exists' });
                } else {
                    const userQuery = 'INSERT INTO authentication1 (id, email, username, password, filename) VALUES (?, ?, ?, ?, ?)';
                    db.query(userQuery, [id, email, username, password, filename], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ message: 'Registration successful' }) 
                        }
                    });
                }
            }
        });
    });
};

exports.ModelLogin = (data) => {
    return new Promise((resolve, reject) => {
        const { email, password } = data;
        const loginQuery = 'SELECT * FROM authentication1 WHERE email = ?';
        db.query(loginQuery, [email], (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(result)
                resolve(result);
            }
        });
    });
};

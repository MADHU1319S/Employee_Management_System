const db = require('../db');

exports.ModelEmp = (data) => {
    return new Promise((resolve, reject) => {
        const { name, email, contactinformation, department, designation } = data;
        const checkQuery = 'SELECT * FROM employee WHERE name=? AND email=?';
        db.query(checkQuery, [name, email], (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve({ message: 'Details already exist' });
                } else {
                    const empquery = 'INSERT INTO employee (name, email, contactinformation, department, designation) VALUES (?, ?, ?, ?, ?)';
                    db.query(empquery, [name, email, contactinformation, department, designation], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ message: 'Successfully entered' });
                        }
                    });
                }
            }
        });
    });
};

exports.ModelGet = () => {
    return new Promise((resolve, reject) => {
        const getquery = 'SELECT * FROM employee';
        db.query(getquery, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.Modelupdate = (id, data) => {
    return new Promise((resolve, reject) => {
        const { name, email, contactinformation, department, designation } = data;
        const Updatequery = 'UPDATE employee SET name=?, email=?, contactinformation=?, department=?, designation=? WHERE id=?';
        db.query(Updatequery, [name, email, contactinformation, department, designation, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.Modeldelete = (id) => {
    return new Promise((resolve, reject) => {
        const deletequery = 'DELETE FROM employee WHERE id=?';
        db.query(deletequery, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

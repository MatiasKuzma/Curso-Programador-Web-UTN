var pool = require('./bd');
var md5 = require('md5');

async function getUserAndPassword(user, password) {
    try {
        var query = 'select * from users where user = ? and password = ? limit 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    }
    catch (error) {
        console.log(error);
    }
}

async function getUsuarios() {
    var query = 'select id, user, nombre, apellido from users'
    var rows = await pool.query(query);
    return rows;
}

async function deleteUserById(id) {
    var query = 'delete from users where id = ?';
    var rows = await pool.query(query, [id]);
    return rows
}

async function getUserById(id) {
    var query = 'select * from users where id = ?'
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function updateUserById(obj, id) {
    try {
        var query = 'update users set ? where id=?'
        var rows = await pool.query(query, [obj, id]);
        console.log(rows)
        return rows;
    }
    catch (error) {
        throw error;
    }

}

module.exports = { getUserAndPassword, getUsuarios, deleteUserById, getUserById, updateUserById };
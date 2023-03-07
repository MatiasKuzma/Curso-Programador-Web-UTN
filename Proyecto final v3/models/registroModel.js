var pool = require('./bd');
var md5 = require('md5');

async function cargarUsuario(usuario, contraseña, nombre, apellido, dni, telefono){
            try{
                var query = 'insert into users(user, password, nombre, apellido, dni, telefono) values (?, ?, ?, ?, ?, ?)';
                var rows = await pool.query(query, [usuario, md5(contraseña), nombre, apellido, dni, telefono])
                return rows[0]
            }
            catch (error){
                console.log(error)
            }
        }

    
    
// }

async function validarDniUsuario(dni){
    try{
        var query= 'select * from users where dni = ? limit 1';
        var rows = await pool.query(query, [dni])
        return rows[0];
}
    catch (error){
        console.log(error)
    }
}
module.exports = {cargarUsuario, validarDniUsuario};
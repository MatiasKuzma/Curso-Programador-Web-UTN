var pool = require('./bd');

async function getEventos(){
    try{
        var query = 'select * from eventos';
        var rows = await pool.query(query);
        return rows;
    }
    catch (error){
        console.log(error);
    }
}

async function uploadEvento(obj){
    try {
        var query = 'insert into eventos set ?';
        var rows = await pool.query(query, [obj])
        return rows[0]
    }
    catch (error) {
        console.log(error)
    }
}

async function deleteEventoById(id) {
    var query = 'delete from eventos where id = ?';
    var rows = await pool.query(query, [id]);
    return rows
}

async function getEventoById(id) {
    var query = 'select * from eventos where id = ?'
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function updateEventoById(obj, id) {
    try {
        var query = 'update eventos set ? where id=?'
        var rows = await pool.query(query, [obj, id]);
        console.log(rows)
        return rows;
    }
    catch (error) {
        throw error;
    }

}

module.exports = {getEventos, uploadEvento, deleteEventoById, getEventoById, updateEventoById};
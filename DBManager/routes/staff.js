var express = require('express');
var router = express.Router();

function throw_err(err, res) {
    res.json({ 'error': {
        message: err.message,
        error: err
    }});
    throw err;
}




/* GET staff listing. */

var projection = function(req,res){
  pagination(req, res, req.query.fields, 'staff');
};

router.get('/', function(req, res){
        var get_target = ' '
        pagination(req, res, '*', 'staff', get_target)
});

router.get('/:id', function(req, res) {	
    var get_target = ' WHERE staff_id='  + req.params.id + ' '
    pagination(req, res, '*', 'staff', get_target)
});

router.get('address/:id', function(req, res) {	
    var get_target = ' WHERE address_id='  + req.params.id + ' '
    pagination(req, res, '*', 'staff', get_target)
});

router.get('store/:id', function(req, res) {
    var get_target = ' WHERE store_id='  + req.params.id + ' '
    pagination(req, res, '*', 'staff', get_target)
});


//POST

router.post('/', function(req, res) {
	
	
	query1 = 'INSERT INTO store (store_id,manager_staff_id,address_id,last_update) VALUES (?,?,?,?)';
    params = [req.body.store_id, req.body.staff_id,req.body.address_id,req.body.last_update]
    sql.query(query1, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });
    });
    query = 'INSERT INTO staff (staff_id,first_name,last_name,address_id,picture,email,store_id,active,username,password,last_update) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    params = [req.body.staff_id,req.body.first_name,req.body.last_name,req.body.address_id,req.body.picture,req.body.email,req.body.store_id,req.body.active,req.body.username,req.body.password,req.body.last_update]
    sql.query(query, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });  
    });
    });
    
// PUT

router.put('/:id', function(req, res) {
    query = 'UPDATE staff SET last_update= ?,address_id=?,first_name=?,last_name=?,email=?,active=?,username=?,password=? WHERE staff_id = ?';
    params = [req.body.first_name,req.body.last_name,req.body.address_id,req.body.email,req.body.active,req.body.username,req.body.password,req.body.last_update,req.params.id]
    sql.query(query, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });
    });
});

/*router.delete('/:id', function(req, res) {
    query = 'DELETE staff WHERE staff_id = '+ req.params.id;
    params = [req.params.id]
    sql.query(query, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });
    });
});
*/

router.delete('/:id', function(req, res) {
    sql.query('DELETE FROM staff WHERE staff_id = ' + req.params.id,function(err,rows,fields){
    if(err) throw_err1(err,res);
    res.json({'success': 1});
});
});


module.exports = router;

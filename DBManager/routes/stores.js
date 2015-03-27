
var express = require('express');
var router = express.Router();

function throw_err(err, res) {
    res.json({ 'error': {
        message: err.message,
        error: err
    }});
    throw err;
}

/* GET store listing. */

router.get('/', function(req, res) {	
    var get_target = ''
    pagination(req, res, '*', 'store', get_target)

});

router.get('/:id', function(req, res) {
    var get_target = ' WHERE store_id='  + req.params.id + ' '
    pagination(req, res, '*', 'store', get_target)
});

router.get('/manager/:id', function(req, res) {	
    var get_target = ' WHERE manager_staff_id='  + req.params.id + ' '
    pagination(req, res, '*', 'store', get_target)
});

router.get('/manager/:id1/address/:id2', function(req, res) {	
	var get_target = ' WHERE manager_staff_id='  + req.params.id1 
	+ ' AND address_id=' + req.params.id2 
	+ ' '
    pagination(req, res, '*', 'store', get_target)
});

router.get('/address/:id', function(req, res) {	
	var get_target = ' WHERE address_id='  + req.params.id + ' '
    pagination(req, res, '*', 'store', get_target)
});

router.get('/address/:id1/manager/:id2', function(req, res) {	
	var get_target = ' WHERE address_id='  + req.params.id1 
		+ ' AND manager_staff_id=' + req.params.id2 
		+ ' '
    pagination(req, res, '*', 'store', get_target)
});

router.get('/:id1/manager/:id2', function(req, res) {	
	var get_target = ' WHERE store_id='  + req.params.id1 
		+ ' AND manager_staff_id=' + req.params.id2 
		+ ' '
    pagination(req, res, '*', 'store', get_target)
});

router.get('/:id1/address/:id2', function(req, res) {	
	var get_target = ' WHERE store_id='  + req.params.id1 
		+ ' AND address_id=' + req.params.id2 
		+ ' '
    pagination(req, res, '*', 'store', get_target)
});

router.get('/:id1/manager/:id2/address/:id3', function(req, res) {	
	var get_target = ' WHERE store_id='  + req.params.id1 
		+ ' AND manager_staff_id=' + req.params.id2 
		+ ' AND address_id=' + req.params.id3
		+ ' '
    pagination(req, res, '*', 'store', get_target)
});

router.get('/:id1/address/:id2/manager/:id3', function(req, res) {	
	var get_target = ' WHERE store_id='  + req.params.id1 
		+ ' AND address_id=' + req.params.id2 
		+ ' AND manager_staff_id=' + req.params.id3
		+ ' '
    pagination(req, res, '*', 'store', get_target)
});


//Post
router.post('/', function(req, res) {
    query = 'INSERT INTO store (store_id,manager_staff_id,address_id,last_update) VALUES (?,?,?,?)';
    params = [req.body.store_id, req.body.manager_staff_id,req.body.address_id,req.body.last_update]
    sql.query(query, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });
    });
});

/*
 * PUT stores/id.
 */
// localhost:3000/stores/1
router.put('/:id', function(req, res) {
    query = 'UPDATE store SET last_update= ?,address_id=? WHERE store_id = ?';
    params = [req.body.last_update,req.body.address_id,req.params.id]
    sql.query(query, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });
    });
});

//e.g http://localhost:3000/stores?offset=0&limit=10

//DELETE --400 error due to foriegn key
router.delete('/:id', function(req, res) {
    sql.query('DELETE FROM store WHERE store_id = ' + req.params.id,function(err,rows,fields){
    if(err) throw_err1(err,res);
    res.json({'success': 1});
});
});

module.exports = router;

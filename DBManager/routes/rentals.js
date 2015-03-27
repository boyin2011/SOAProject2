var express = require('express');
var router = express.Router();

function throw_err(err, res) {
    res.json({ 'error': {
        message: err.message,
        error: err
    }});
    throw err;
}

/* GET rental listing. */

var projection = function(req,res){
  pagination(req, res, req.query.fields, 'rental', '');
};

router.get('/', function(req, res){
	if(req.query.fields)
		return projection(req, res);
	else
		return pagination(req, res, '*', 'rental', '');
});

router.get('/:id', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id + ' '
	pagination(req, res, '*', 'rental', get_target)

});

router.get('/customer/:id', function(req, res) {	
	var get_target = ' WHERE customer_id='  + req.params.id + ' '
	pagination(req, res, '*', 'rental', get_target)
});

router.get('/staff/:id', function(req, res) {	
	var get_target = ' WHERE staff_id='  + req.params.id + ' '
	pagination(req, res, '*', 'rental', get_target)
});

router.get('/inventory/:id', function(req, res) {
	var get_target = ' WHERE inventory_id='  + req.params.id + ' '
	pagination(req, res, '*', 'rental', get_target)
});

router.get('/customer/:id1/staff/:id2', function(req, res) {
	var get_target = ' WHERE customer_id='  + req.params.id1 + ' AND staff_id=' + req.params.id2 + ' '
	pagination(req, res, '*', 'rental', get_target)
});

router.get('/staff/:id1/customer/:id2', function(req, res) {	
	var get_target = ' WHERE customer_id='  + req.params.id2 + ' AND staff_id=' + req.params.id1 + ' '
	pagination(req, res, '*', 'rental', get_target)
});

router.get('/customer/:id1/inventory/:id2', function(req, res) {	
	var get_target = ' WHERE customer_id='  + req.params.id1 + ' AND inventory_id=' + req.params.id2 + ' '
	pagination(req, res, '*', 'rental', get_target)
});

router.get('/inventory/:id1/customer/:id2', function(req, res) {	
	var get_target = ' WHERE inventory_id='  + req.params.id1 + ' AND customer_id=' + req.params.id2 + ' '
	pagination(req, res, '*', 'rental', get_target)
});

router.get('/inventory/:id1/staff/:id2', function(req, res) {	
	var get_target = ' WHERE inventory_id='  + req.params.id1 + ' AND staff_id=' + req.params.id2 + ' '
	pagination(req, res, '*', 'rental', get_target)
});

router.get('/staff/:id1/inventory/:id2', function(req, res) {	
	var get_target = ' WHERE staff_id='  + req.params.id1 + ' AND inventory_id=' + req.params.id2 + ' '
	pagination(req, res, '*', 'rental', get_target)
});

router.get('/:id1/customer/:id2', function(req, res) {
	var get_target = ' WHERE rental_id='  + req.params.id1 + ' AND customer_id=' + req.params.id2 + ' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/:id1/staff/:id2', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 + ' AND staff_id=' + req.params.id2 + ' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/:id1/inventory/:id2', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 + ' AND inventory_id=' + req.params.id2 + ' '
	pagination(req, res, '*', 'rental', get_target)	
});


router.get('/:id1/customer/:id2/staff/:id3', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 + ' AND customer_id=' + req.params.id2 + ' '
	pagination(req, res, '*', 'rental', get_target)	

});

router.get('/:id1/staff/:id2/customer/:id3', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 + ' AND staff_id=' + req.params.id2 + ' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/:id1/customer/:id2/inventory/:id3', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 
		+ ' AND customer_id=' + req.params.id2 + ' AND inventory_id=' + req.params.id3 +' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/:id1/inventory/:id2/customer/:id3', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 
		+ ' AND inventory_id=' + req.params.id2 + ' AND customer_id=' + req.params.id3 +' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/:id1/staff/:id2/inventory/:id3', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 
		+ ' AND inventory_id=' + req.params.id2 + ' AND staff_id=' + req.params.id3 +' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/:id1/inventory/:id2/staff/:id3', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 
		+ ' AND inventory_id=' + req.params.id2 + ' AND customer_id=' + req.params.id3 +' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/:id1/customer/:id2/inventory/:id3/staff/:id4', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 
		+ ' AND inventory_id=' + req.params.id2 + ' AND staff_id=' + req.params.id3 +' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/:id1/customer/:id2/staff/:id3/inventory/:id4', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 
		+ ' AND customer_id=' + req.params.id2 + ' AND inventory_id=' + req.params.id3 +' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/:id1/inventory/:id2/customer/:id3/staff/:id4', function(req, res) {
	var get_target = ' WHERE rental_id='  + req.params.id1 
		+ ' AND inventory_id=' + req.params.id2 
		+ ' AND customer_id=' + req.params.id3 
		+ ' AND staff_id=' + req.params.id4 
		+' '
	pagination(req, res, '*', 'rental', get_target)	

});

router.get('/:id1/inventory/:id2/staff/:id3/customer/:id4', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 
		+ ' AND inventory_id=' + req.params.id2 
		+ ' AND staff_id=' + req.params.id3 
		+ ' AND customer_id=' + req.params.id4 
		+' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/:id1/staff/:id2/customer/:id3/inventory/:id4', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 
		+ ' AND staff_id=' + req.params.id2 
		+ ' AND customer_id=' + req.params.id3 
		+ ' AND inventory_id=' + req.params.id4 
		+' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/:id1/staff/:id2/inventory/:id3/customer/:id4', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 
		+ ' AND staff_id=' + req.params.id2 
		+ ' AND inventory_id=' + req.params.id3 
		+ ' AND customer_id=' + req.params.id4 
		+' '
	pagination(req, res, '*', 'rental', get_target)	
});



router.get('/customer/:id1/inventory/:id2/staff/:id3', function(req, res) {	
	var get_target = ' WHERE customer_id='  + req.params.id1 
		+ ' AND inventory_id=' + req.params.id2 
		+ ' AND staff_id=' + req.params.id3 
		+' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/customer/:id1/staff/:id2/inventory/:id3', function(req, res) {	
	var get_target = ' WHERE customer_id='  + req.params.id1 
	+ ' AND staff_id=' + req.params.id2 
	+ ' AND inventory_id=' + req.params.id3 
	+' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/inventory/:id1/customer/:id2/staff/:id3', function(req, res) {	
	var get_target = ' WHERE inventory_id='  + req.params.id1 
	+ ' AND customer_id=' + req.params.id2 
	+ ' AND staff_id=' + req.params.id3 
	+' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/inventory/:id1/staff/:id2/customer/:id3', function(req, res) {	
	var get_target = ' WHERE inventory_id='  + req.params.id1 
	+ ' AND staff_id=' + req.params.id2 
	+ ' AND customer_id=' + req.params.id3 
	+' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/staff/:id1/customer/:id2/inventory/:id3', function(req, res) {	
	var get_target = ' WHERE staff_id='  + req.params.id1 
	+ ' AND customer_id=' + req.params.id2 
	+ ' AND inventory_id=' + req.params.id3 
	+' '
	pagination(req, res, '*', 'rental', get_target)	
});

router.get('/staff/:id2/inventory/:id3/customer/:id4', function(req, res) {	
	var get_target = ' WHERE staff_id='  + req.params.id1 
	+ ' AND inventory_id=' + req.params.id2 
	+ ' AND customer_id=' + req.params.id3 
	+' '
	pagination(req, res, '*', 'rental', get_target)	
});

//POST

router.post('/', function(req, res) {
    query = 'INSERT INTO rental (rental_id,rental_data,inventory_id,customer_id,staff_id,return_data,last_update) VALUES (?,?,?,?,?,?,?)';
    params = [req.body.rental_id, req.body.customer_id,req.body.staff_id,req.body.rental_data,req.body.inventory_id,req.body.return_data,req.body.last_update]
    sql.query(query, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });
    });
});

//PUT

router.put('/:id', function(req, res) {
    query = 'UPDATE payment SET customer_id = ?,staff_id = ?,rental_data = ?,inventory_id = ?,return_data = ?,last_update = ? WHERE rental_id = ?';
    params = [req.params.id, req.body.customer_id,req.body.staff_id,req.body.rental_data,req.body.inventory_id,req.body.return_data,req.body.last_update]
    sql.query(query, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });
    });
});

//DELETE
router.delete('/:id', function(req, res) {
    sql.query('DELETE FROM rental WHERE rental_id = ' + req.params.id,function(err,rows,fields){
    if(err) throw_err1(err,res);
    res.json({'success': 1});
});
});



module.exports = router;

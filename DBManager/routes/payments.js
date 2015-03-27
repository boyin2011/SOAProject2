var express = require('express');
var router = express.Router();

function throw_err(err, res) {
    res.json({ 'error': {
        message: err.message,
        error: err
    }});
    throw err;
}

/* GET payment listing. */

var projection = function(req,res){
  pagination(req, res, req.query.fields, 'payment', '');
};

router.get('/', function(req, res){
	if(req.query.fields)
		return projection(req, res);
	else
		return pagination(req, res, '*', 'payment', '');
});

router.get('/:id', function(req, res) {
	var get_target = ' WHERE payment_id='  + req.params.id + ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('customer/:id', function(req, res) {	
	var get_target = ' WHERE customer_id='  + req.params.id + ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('staff/:id', function(req, res) {	
	var get_target = ' WHERE staff_id='  + req.params.id + ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('rental/:id', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id + ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('/customer/:id1/staff/:id2', function(req, res) {
	var get_target = ' WHERE customer_id='  + req.params.id1 
		+ ' AND staff_id=' + req.params.id2 
		+ ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('/staff/:id1/customer/:id2', function(req, res) {	
	var get_target = ' WHERE staff_id='  + req.params.id1 
		+ ' AND customer_id=' + req.params.id2 
		+ ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('/customer/:id1/rental/:id2', function(req, res) {	
	var get_target = ' WHERE customer_id='  + req.params.id1 
		+ ' AND rental_id=' + req.params.id2 
		+ ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('/rental/:id1/customer/:id2', function(req, res) {	
	var get_target = ' WHERE rental_id='  + req.params.id1 
		+ ' AND customer_id=' + req.params.id2 
		+ ' '
    pagination(req, res, '*', 'payment', get_target)
});


router.get('/:id1/customer/:id2', function(req, res) {	
	var get_target = ' WHERE payment_id='  + req.params.id1 
		+ ' AND customer_id=' + req.params.id2 
		+ ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('/:id1/staff/:id2', function(req, res) {	
	var get_target = ' WHERE payment_id='  + req.params.id1 
		+ ' AND staff_id=' + req.params.id2 
		+ ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('/:id1/rental/:id2', function(req, res) {	
	var get_target = ' WHERE payment_id='  + req.params.id1 
		+ ' AND rental_id=' + req.params.id2 
		+ ' '
    pagination(req, res, '*', 'payment', get_target)
});


router.get('/:id1/customer/:id2/staff/:id3', function(req, res) {	
	var get_target = ' WHERE payment_id='  + req.params.id1 
		+ ' AND customer_id=' + req.params.id2 
		+ ' AND staff_id=' + req.params.id3
		+ ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('/:id1/staff/:id2/customer/:id3', function(req, res) {	
	var get_target = ' WHERE payment_id='  + req.params.id1 
		+ ' AND staff_id=' + req.params.id2 
		+ ' AND customer_id=' + req.params.id3
		+ ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('/:id1/customer/:id2/rental/:id3', function(req, res) {	
	var get_target = ' WHERE payment_id='  + req.params.id1 
		+ ' AND customer_id=' + req.params.id2 
		+ ' AND rental_id=' + req.params.id3
		+ ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('/:id1/rental/:id2/customer/:id3', function(req, res) {	
	var get_target = ' WHERE payment_id='  + req.params.id1 
		+ ' AND rental_id=' + req.params.id2 
		+ ' AND customer_id=' + req.params.id3
		+ ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('/:id1/staff/:id2/rental/:id3', function(req, res) {	
	var get_target = ' WHERE payment_id='  + req.params.id1 
		+ ' AND staff_id=' + req.params.id2 
		+ ' AND rental_id=' + req.params.id3
		+ ' '
    pagination(req, res, '*', 'payment', get_target)
});

router.get('/:id1/rental/:id2/staff/:id3', function(req, res) {	
	var get_target = ' WHERE payment_id='  + req.params.id1 
		+ ' AND rental_id=' + req.params.id2 
		+ ' AND staff_id=' + req.params.id3
		+ ' '
    pagination(req, res, '*', 'payment', get_target)
});

//POST

router.post('/', function(req, res) {
    query = 'INSERT INTO payment (payment_id,customer_id,staff_id,rental_id,amount,payment_date,last_update) VALUES (?,?,?,?,?,?,?)';
    params = [req.body.payment_id,req.body.customer_id,req.body.staff_id,req.body.rental_id,req.body.amount,req.body.payment_date,req.body.last_update]
    sql.query(query, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });
    });
});

//PUT

router.put('/:id', function(req, res) {
    query = 'UPDATE payment SET customer_id = ?,staff_id = ?,rental_id = ?,amount = ?,payment_date = ?,last_update = ? WHERE payment_id = ?';
    params = [req.params.id, req.body.customer_id,req.body.staff_id,req.body.rental_id,req.body.amount,req.body.payment_date,req.body.last_update]
    sql.query(query, params, function(err, rows, fields) {
        if (err) throw_err(err, res);
        res.json({ 'success': 1 });
    });
});


//DELETE
router.delete('/:id', function(req, res) {
    sql.query('DELETE FROM payment WHERE payment_id = ' + req.params.id,function(err,rows,fields){
    if(err) throw_err1(err,res);
    res.json({'success': 1});
});
});



module.exports = router;



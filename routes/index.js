
/*
 * GET home page.
 */

exports.index = function(req, res)
{
	res.render('index',
  	{
		title: 'Flash x Js',
		msg : 'please type...',
		input: ''
	});
};
var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.create_match_type = create_match_type ;

function create_match_type(req,res){


	var name = req.body.name;
	var buy_in = req.body.buy_in;

	if(_.isUndefined(name))
	{
			return res.json({
			 error: {
			 	status_code : 2,
			 	message :"name cannot be blank"
			 } 
		})

	}
	if(_.isUndefined(buy_in))
	{
			return res.json({
			 error: {
			 	status_code : 3,
			 	message :"buy_in cannot be blank"
			 } 
		})

	}

	m.match_type.create({ name: name,buy_in:buy_in,created_at:moment().format()}).then(function()
		{
			return res.json({
			 data: {
			 	status_code:0,
			 	message :"successfully created a match_type"
			 } 
		})

		});

	
	
}
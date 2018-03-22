var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.create_striker = create_striker ;

function create_striker(req,res){

	var name = req.body.name;

	if(_.isUndefined(name))
	{
			return res.json({
			 error: {
			 	status_code : 2,
			 	message :"name cannot be blank"
			 } 
		})

	}

	m.striker.create({ name: name,created_at:moment().format()}).then(function()
		{
			return res.json({
			 data: {
			 	status_code:0,
			 	message :"successfully created a striker"
			 } 
		})

		});

	
	
}
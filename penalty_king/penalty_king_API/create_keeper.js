var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.create_keeper = create_keeper ;

function create_keeper(req,res){

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

	m.keeper.create({ name: name,created_at:moment().format()}).then(function()
		{
			return res.json({
			 data: {
			 	status_code:0,
			 	message :"successfully created a keeper"
			 } 
		})

		});

	
	
}
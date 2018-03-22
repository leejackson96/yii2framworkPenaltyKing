var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.create_achievement = create_achievement ;

function create_achievement(req,res){


	var name = req.body.name;
	var description = req.body.description;
	var total_exp = req.body.total_exp;

	if(_.isUndefined(name))
	{
			return res.json({
			 error: {
			 	status_code : 2,
			 	message :"name cannot be blank"
			 } 
		})

	}
	if(_.isUndefined(description))
	{
			return res.json({
			 error: {
			 	status_code : 8,
			 	message :"description cannot be blank"
			 } 
		})

	}
	if(_.isUndefined(total_exp))
	{
			return res.json({
			 error: {
			 	status_code : 9,
			 	message :"total_exp cannot be blank"
			 } 
		})

	}

	m.achievement.create({ name: name,description:description,total_exp:total_exp,created_at:moment().format()}).then(function()
		{
			return res.json({
			 data: {
			 	status_code:0,
			 	message :"successfully created an achievement"
			 } 
		})
		});

	
	
}
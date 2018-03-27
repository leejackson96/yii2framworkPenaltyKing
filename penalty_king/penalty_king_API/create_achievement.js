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
	m.achievement.findOne({
		where:{
			name:name
		}
	}).then(function(achievement_data){
		if(achievement_data)
		{
			return res.json({
				 data: {
				 	status_code:1,
				 	message :"Achievement already existed"
					 } 
				})
		}
		else
		{
			m.achievement.create({ name: name,description:description,total_exp:total_exp,created_at:moment().format()}).then(function(achievement)
			{
				return res.json({
					error:{
						status_code:0,
				 	message :"successfully created an achievement"
					},
				 data: {
				 	achievement_id:achievement.id,
				 	name:name
					 } 
				})
			});

		}
	})
	

	
	
}
var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.initialize = initialize ;

function initialize(req,res){



	m.avatar.findOne({
		where:{
			name:"default"
		}
	}).then(function(avatar_data){
		if(avatar_data)
		{
			return res.json({
			error:{
				status_code:1,
				message:"avatar already existed"
				}
			})

		}
		else
		{
				m.avatar.create({
					name:'default',
					created_at:moment().format()
					});
		}
	});


	m.achievement.findOne({
		where:{
			name:'rank'
		}
	}).then(function(achievement_data){
		if(achievement_data)
		{
			
		}
		else
		{
			m.achievement.create({
				name:'rank',
				description:"player's rank,",
				total_exp:100,
				created_at:moment().format()

			}).then(function(){
			return res.json({
				error:{
					status_code:0,
					message:"successfully created avatar and achievement"
				}
			})
			})
		}
	})




	
}
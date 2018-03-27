var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.create_avatar = create_avatar ;

function create_avatar(req,res){
	var name = req.body.avatar_name;
	if(_.isUndefined(name))
	{
		return res.json({
			 error: {
			 	status_code : 1,
			 	message :"avatar_name cannot be blank"
			 } 
		})

	}
	m.avatar.findOne({
		where:{
			name:name
		}
	}).then(function(avatar_data){
		if(avatar_data)
		{
			return res.json({
			 error: {
			 	status_code : 1,
			 	message :"avatar_name already existed"
				 } 
			})
		}
		else
		{
			m.avatar.create({ name: name,created_at:moment().format()}).then(function(avatar)
			{
				return res.json({
					error:{
						status_code:0,
						message :"successfully created an avatar"

					},
				 data: {
				 		avatar_id:avatar.id,
				 		name:name
					 } 
				})

			});
		}
	})
	

	
	
}
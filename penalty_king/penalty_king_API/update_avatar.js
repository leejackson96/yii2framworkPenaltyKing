var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.update_avatar = update_avatar ;

function update_avatar(req,res){

	var name = req.body.name;
	var avatar_id = req.body.avatar_id;


	if(_.isUndefined(avatar_id))
	{
		return res.json({
			 error: {
			 	status_code : 1,
			 	message :"avatar_id cannot be blank"
			 } 
		});

	}

	m.avatar.update({ 
		name: name
		},
		{
			where:{
				id:avatar_id
			}
		}).then(function()
		{
			return res.json({
			 error: {
			 	status_code : 0,
			 	message :"successfully updated an avatar"
			 } 
		})
		})

	
	
}
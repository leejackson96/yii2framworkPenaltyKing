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

	m.avatar.create({ name: name,created_at:moment().format()}).then(function()
		{
			return res.json({
			 data: {
			 	message :"successfully created an avatar"
			 } 
		})

		});

	
	
}
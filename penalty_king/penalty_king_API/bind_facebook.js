var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.bind_facebook = bind_facebook ;

 function bind_facebook(req,res){
 	var player_id=req.body.player_id
 	var facebook_id=req.body.facebook_id

 	if(_.isUndefined(player_id)||player_id==null )
 	{
 			return res.json({
			 error: {
	 			status_code : 1006,
	 			message :" player_id cannot be blank"
					} 
			})
 	}
 	if(facebook_id==null || _.isUndefined(facebook_id))
 	{
 			return res.json({
			 error: {
	 			status_code : 1017,
	 			message :" facebook_id cannot be blank"
					} 
			})
 	}
 	m.player.findOne({
 		where:{
 			id:player_id
 		}
 	}).then(function(player_data){
 		if(player_data.facebook_id!=null)
 		{
 			return res.json({
	 				error:{
	 					status_code:3017,
	 					message:"this player has already binded facebook"
	 				}
	 			})
 		}
 		if(player_data)
 		{	
 			m.player.update({
 				facebook_id:facebook_id,
 				is_guest:0
 			},
 			{
 				where:{
 					id:player_id
 				}
 			}).then(function(){
	 				return res.json({
	 				error:{
	 					status_code:0,
	 					message:"successfully bind with facebook"
	 				},
	 				data:{
	 					id:player_data.id,
	 					facebook_id:facebook_id
	 				}
	 			})
 			})
 		}
 		else
 		{
 			return res.json({
 				error:{
 					status_code:3006,
 					message:"player_id cannot found"
 				}
 			})
 		}
 	})
 }

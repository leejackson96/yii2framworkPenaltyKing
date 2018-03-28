var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.delete_avatar = delete_avatar ;


 function delete_avatar(req,res){

 	var avatar_id=req.body.avatar_id;

 	if(_.isUndefined(avatar_id))
 	{
 		return res.json({
 			error:{
 				status_code:1000,
 				message:"avatar_id cannot be blank"
 			}
 		})
 	}
 	m.avatar.findOne({
 		where:{
 			id:avatar_id

 		}
 	}).then(function(avatar_data){
 		if(avatar_data.deleted_at!=null)
 		{
 			return res.json({
 				error:{
 						status_code:3000,
 						message:" avatar already deleted"
 					}
 			})
 		}
 		if(avatar_data)
 		{
 			m.avatar.update(
 			{
 				deleted_at:moment().format()
 			},
 			{
 				where:{
 					id:avatar_id
 				}
 			}).then(function(avatar){
 				return res.json({
 					error:{
 						status_code:0,
 						message:"successfully deleted an avatar"
 					},	
 					data:{
 						avatar_id:avatar_data.id
 					}
 				})
 			})
 		}
 		else
 		{
 			return res.json({
 				error:{
 					status_code:3000,
 					message:"avatar_id does not exist in the database"
 				}
 			})
 		}
 	})

 }
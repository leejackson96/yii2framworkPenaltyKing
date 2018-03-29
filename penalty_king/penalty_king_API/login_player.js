var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.login_player = login_player ;

function login_player(req,res){

	var username =req.body.username;
	var password = req.body.password;
	var ip_address= req.body.ip_address;
	var country = req.body.country;
	
	if(_.isUndefined(username))
	{
		return res.json({
			 error: {
			 	status_code : 1022,
			 	message :"username cannot be blank"
			 } 
		});

	}
	if(_.isUndefined(password))
	{
		return res.json({
			 error: {
			 	status_code : 1038,
			 	message :"password cannot be blank"
			 } 
		});

	}
	if(_.isUndefined(ip_address))
	{
		return res.json({
			 error: {
			 	status_code : 1036,
			 	message :"ip_address cannot be blank"
			 } 
		});

	}
	if(_.isUndefined(country))
	{
		return res.json({
			 error: {
			 	status_code : 1037,
			 	message :"country cannot be blank"
			 } 
		});

	}

	m.player.findOne({
		where:{
			username:username,
			password:password
			}
	}).then(function(player_data){
		if(player_data)
		{
			if(player_data.is_guest==1)
			{
				return res.json({
					 error: {
			 			status_code : 3040,
			 			message :"must create online acc first"
							 } 
					});

			}
			var access_token = random_generate_access_token(player_data.id);
			m.player.update({
				status:"online",
				access_token:access_token,
				ip_address:ip_address,
				country:country
			},
			{
				where:{
					id:player_data.id
				}
			})
				  return res.json({
				  	error:{
				  		status_code :0,
						 message:"successfully login"	

				  	},
				  	data:{
					  	 avatar_id:player_data.avatar_id,
					  	 player_id:player_data.id,
						 access_token:access_token
				  	}


				  });



		}
		else
		{
			return res.json({
				  	error:{
					 status_code :1022,
					 message:"invalid username/password"	
				  	}


				  });

		}

	});
}
function random_generate_access_token(player_id){

	var alphabet =['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var number = [1,2,3,4,5,6,7,8,9];
	var random ;
	var access_token="";

	for(i = 0 ;i<16;i++)
	{	
		random=Math.floor(Math.random() * 2)+1;
		if(random==1)
		{
			access_token+=alphabet[Math.floor(Math.random() * alphabet.length)];
		}
		else if(random==2)
		{
			access_token+=number[Math.floor(Math.random() * number.length)];
		}
	}
	access_token+=player_id;

	return access_token;
}
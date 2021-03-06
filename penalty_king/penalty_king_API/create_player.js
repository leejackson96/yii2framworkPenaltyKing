var m = require("../models");
var _ = require('lodash');
var moment = require('moment');
exports = module.exports = {};
exports.create_player = create_player ;

 function create_player(req,res){

 	var game_id = req.body.game_id;
 	var method = req.body.method;
	var password = req.body.password;
	var facebook_id = req.body.facebook_id;
	var country = req.body.country;
	var ip_address = req.body.ip_address;
	var access_token;
 	
 	if(_.isUndefined(game_id))
	{
		return res.json({
			 error: {
	 			status_code : 1016,
	 			message :" game_id cannot be blank"
					} 
			})
	}
	if(_.isUndefined(method))
	{
		return res.json({
			 error: {
	 			status_code : 1035,
	 			message :" method cannot be blank"
					} 
			})
	}




	if(game_id==1)
	{		
		if(method==1)
			{
				
				if(_.isUndefined(ip_address))
				{
					return res.json({
						 error: {
				 			status_code : 1036,
				 			message : "ip_address cannot be blank"
								} 
						})
				}
				if(_.isUndefined(country))
				{
					return res.json({
						 error: { 

				 			status_code : 1037,
				 			message : "country cannot be blank"
								} 
						})
				}
				if(_.isUndefined(facebook_id))
				{
					return res.json({
						 error: {
				 			status_code : 1017,
				 			message : "facebook_id cannot be blank"
								} 
						})
				}
				m.player.findOne({
					where:{
						username:facebook_id,
						facebook_id:facebook_id
					}
				}).then(function(data)
				{
					if(data)
					{
							access_token =random_generate_access_token(data.id);
							m.player.update({
								status:"online",
								access_token:access_token,
								ip_address:ip_address,
								country:country
							},
							{
								where:{
									username:facebook_id,
									facebook_id:facebook_id
										}
							});

							return res.json({
								error:{
									status_code:0,
									message:"successfully login"
								},
								 data: {
						 			avatar_id:data.avatar_id,
			 						player_id:data.id,
			 						access_token:access_token
										 } 
							});
					}
					else
					{
					
						m.player.create({
							avatar_id:1 ,
							username:facebook_id,
							password:password,
							facebook_id:facebook_id,
							status:"online",
							country:country,
							ip_address:ip_address,
							is_bot:0,
							is_guest:0,
							last_login_at:moment().format(),
							created_at:moment().format()
						}).then(function(player)
						{
							create_bot(player.id);
							access_token =random_generate_access_token(player.id);
							m.player.update({
								access_token:access_token
							},
							{
								where:{
									id:player.id
										}
							});
							create_wallet(player.id,'coin',10000);
							create_statistics(game_id,player.id);
							create_achievement(player.id);
							return res.json({
								error:{
									status_code:0,
									message:"successfully created"
								},
								 data: {
						 			avatar_id:player.avatar_id,
			 						player_id:player.id,
			 						access_token:access_token
										 } 
							});
						});

					}
				});
		}
		else if(method==2)
		{
			var username = req.body.username;
			if(_.isUndefined(username))
			{
				return res.json({
					 error: {
			 			status_code : 1022,
			 			message :" username cannot be blank"
							} 
					})
			}
			if(_.isUndefined(password)|| password==" ")
			{
				return res.json({
					 error: {
			 			status_code : 1038,
			 			message : "password cannot be blank"
							} 
					})
			}
			m.player.findOne({
			where:{
				username:username
				}
			}).then(function(player_data)
				{
					if(player_data)
					{
						return res.json({
							 error: {
							 	status_code :3022,
				 				message :"username existed"
								} 
							});
					}
					else
					{
						m.player.update(
						{
							username:username.toLowerCase(),
							password:password,
							is_guest:0
						},
						{
							where:{
								id:player_id
							}
						}).then(function()
						{
							return res.json({
								 error: {
							 		status_code :0,
				 					message :"updated successfully"
									 },
								data: {
							 		avatar_id:player_data.avatar_id,
								 	player_id:player_data.id,
								 	access_token:player_data.access_token
								 }  
							});
						})
					}

				});
		}
		
		else if(req.body.method==3)
		{
			
			if(_.isUndefined(ip_address))
			{
				return res.json({
					 error: {
			 			status_code : 1036,
			 			message : "ip_address cannot be blank"
							} 
					})
			}
			if(_.isUndefined(country))
			{
				return res.json({
					 error: { 

			 			status_code : 1037,
			 			message : "country cannot be blank"
							} 
					})
			}
					
					m.player.create({
						avatar_id:1,
						password:"-",
						status:"online",
						country:country,
						ip_address:ip_address,
						is_bot:0,
						is_guest:1,
						last_login_at:moment().format(),
						created_at:moment().format()
					}).then(function(player)
					{
						create_bot(player.id);
						access_token =random_generate_access_token(player.id);
						m.player.update({
							username:"guest"+player.id,
							access_token:access_token
						},
						{
					  		where:{
								id:player.id
							}
						});
					
						create_statistics(game_id,player.id);
						create_wallet(player.id,'coin',10000);
						create_achievement(player.id);
						return res.json({
							error:{
								status_code:0,
								message:"successfully created"
							},
							data: {
							 	avatar_id:player.avatar_id,
							 	player_id:player.id,
							 	access_token:access_token
								 }
						});	
					});						
				
			
		
		}
		else
		{
			return res.json({
				error:{
					status_code:2035,
					message:"invalid method"
				}
			})
		}

	}

	

	if(game_id==2)
	{
		
		if(method==1)
		{
			if(_.isUndefined(ip_address))
			{
				return res.json({
					 error: {
			 			status_code : 1036,
			 			message : "ip_address cannot be blank"
							} 
					})
			}
			if(_.isUndefined(country))
			{
				return res.json({
					 error: { 

			 			status_code : 1037,
			 			message : "country cannot be blank"
							} 
					})
			}
			if(_.isUndefined(facebook_id))
			{
				return res.json({
					 error: {
			 			status_code : 1017,
			 			message : "facebook_id cannot be blank"
							} 
					})
			}
			m.player.findOne({
				where:{
					username:username
				}
			}).then(function(data)
			{
				if(data)
				{
					access_token =random_generate_access_token(data.id);
							m.player.update({
								status:"online",
								access_token:access_token,
								ip_address:ip_address,
								country:country
							},
							{
								where:{
									username:facebook_id,
									facebook_id:facebook_id
										}
							});

							return res.json({
								error:{
									status_code:0,
									message:"successfully login"
								},
								 data: {
						 			avatar_id:data.avatar_id,
			 						player_id:data.id,
			 						access_token:access_token
										 } 
							});
				}
				else
				{
					
					m.player.create({
						avatar_id:1 ,
						username:facebook_id,
						password:password,
						facebook_id:facebook_id,
						status:"online",
						country:country,
						ip_address:ip_address,
						is_bot:0,
						is_guest:0,
						last_login_at:moment().format(),
						created_at:moment().format()

					}).then(function(player)
					{
						create_bot(player.id);
						access_token =random_generate_access_token(player.id);
						m.player.update({
							
							access_token:access_token
						},
						{
							where:{
								id:player.id
							}
						});
						create_statistics(game_id,player.id);
						create_wallet(player.id,'coin',10000);
						create_wallet(player.id,'diamond',500);
						create_achievement(player.id);
						create_player_item(player.id);

						return res.json({
							 error:{
									status_code:0,
									message:"successfully created"

								},
								 data: {
						 			avatar_id:player.avatar_id,
						 			player_id:player.id,
						 			access_token:access_token
									 } 
							});		
					});
				}
			});
		}


		else if(method==2)
		{
			var username = req.body.username;
			if(_.isUndefined(username))
			{
				return res.json({
					 error: {
			 			status_code : 1022,
			 			message :" username cannot be blank"
							} 
					})
			}

			if(_.isUndefined(password))
			{
				return res.json({
					 error: {
		 				status_code : 1038,
		 				message : "password cannot be blank"
						} 
					})
			}

			m.player.findOne({
				where:{
					id:player_id
					}
			}).then(function(player_data)
			{

				if(player_data)
				{
					return res.json({
						 error: {
						 	status_code :3022,
			 				message :"username existed"
							} 
						});
				}
				else
				{
					m.player.update(
						{
							username:username.toLowerCase(),
							password:password,
							is_guest:0
						},
						{
							where:{
								id:player_id
								}
						}).then(function()
						{
							return res.json({
								 error: {
							 		status_code :0,
				 					message :"updated successfully"
									 },
								data: {
							 		avatar_id:player_data.avatar_id,
								 	player_id:player_data.id,
								 	access_token:player_data.access_token
								 }  
							});
						})	

				}
					
			});
		}
	

		else if(method==3)
		{

			if(_.isUndefined(ip_address))
			{
				return res.json({
					 error: {
			 			status_code : 1036,
			 			message : "ip_address cannot be blank"
							} 
					})
			}
			if(_.isUndefined(country))
			{
				return res.json({
					 error: { 

			 			status_code : 1037,
			 			message : "country cannot be blank"
							} 
					})
			} 
					m.player.create({
						avatar_id:1,
						password:" ",
						status:"online",
						country:country,
						ip_address:ip_address,
						is_bot:0,
						is_guest:1,
						last_login_at:moment().format(),
						created_at:moment().format()

					}).then(function(player)
					{
						create_bot(player.id);
						access_token =random_generate_access_token(player.id);
						m.player.update({
							username:"guest"+player.id,
							access_token:access_token
						},
						{
					  		where:{
								id:player.id
							}
						});
						create_statistics(game_id,player.id);
						create_wallet(player.id,'coin',10000);
						create_wallet(player.id,'diamond',500);
						create_achievement(player.id);
						create_player_item(player.id);	
						return res.json({
								error:{
									status_code:0,
									message:"successfully created"
								},
								data: {
									avatar_id:player.avatar_id,
									player_id:player.id,
									access_token:access_token
									 }
						});		
					});					
							
				
			
		}
		else
		{
			return res.json({
				error:{
					status_code:2035,
					message:"invalid method"
				}
			})
		}
	}
}

//random generate access_token , add player_id at the back to make it unique
function random_generate_access_token(player_id)
{

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
//create bot with the name'bot' and add player_id to make it unique
function create_bot(player_id){


	m.player.create({
		avatar_id:1,
		username:"bot"+player_id,
		// password:" ",
		// facebook_id:"-",
		status:"available",
		// country:"-",
		// ip_address:"-",
		// access_token:"bot"+player_id,
		is_bot:1,
		is_guest:0,
		last_login_at:moment().format(),
		created_at:moment().format()
		});
}


//create wallet for player
function create_wallet(player_id,type,balance){

	m.wallet.create({
		player_id:player_id,
		type:type,
		balance:balance,
		created_at:moment().format()
		});
}

function create_statistics(game_id,player_id)
{
	if(game_id==1)
	{
		m.statistics.create({
			player_id:player_id,
			total_match:0,
			total_blocks:0,
			total_goals:0,
			total_win:0,
			created_at:moment().format()
		});

	}
	else if(game_id==2)
	{
		m.statistics.create({
			player_id:player_id,
			total_match:0,
			total_win:0,
			created_at:moment().format()
		});

	}

}
//create the rank for the player
function create_achievement(player_id)
{
	m.achievement.findAndCountAll({
		where:{
			deleted_at:null
		}
	}).then(function(achievement_data)
	{
		for(i=1;i<=achievement_data.count;i++)
		{
				m.player_achievement.create({
					player_id:player_id,
					achievement_id:i,
					current_exp:0,
					status:0,
					created_at:moment().format()
				});

		}
	

	});
}
function create_player_item(player_id)
{
	m.item.findAndCountAll({
		where:{
			deleted_at:null
		}
	}).then(function(item_data)
	{

		for(i=1;i<=item_data.count;i++)
		{
			m.player_item.create({
				player_id:player_id,
				item_id:i,
				amount:0,
				created_at:moment().format()
			});
		}

	})
}








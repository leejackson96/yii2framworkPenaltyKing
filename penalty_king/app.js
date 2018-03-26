const express = require('express')
const http = require('http');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
var m = require("./models");
var _ = require('lodash');
var moment = require('moment');
var show_friend= require("./penalty_king_API/show_friend");
var add_friend = require("./penalty_king_API/add_friend");
var delete_friend = require("./penalty_king_API/delete_friend");
var initialize= require("./penalty_king_API/initialize");


var create_avatar = require("./penalty_king_API/create_avatar");
var check_access_token = require("./penalty_king_API/check_access_token");
var create_in_app_purchase = require("./penalty_king_API/create_in_app_purchase");
var create_achievement = require("./penalty_king_API/create_achievement");
var create_robot = require("./penalty_king_API/create_robot");

var get_statistics = require("./penalty_king_API/get_statistics");


var update_avatar = require("./penalty_king_API/update_avatar");
var update_player = require("./penalty_king_API/update_player");
var reward_player = require("./penalty_king_API/reward_player");



//done but havent polish yet
var login_player = require("./penalty_king_API/login_player");
var menu_api = require("./penalty_king_API/menu_api");
var create_player = require("./penalty_king_API/create_player");
var get_balance = require("./penalty_king_API/get_balance");
var start_game = require("./penalty_king_API/start_game");
var cancelled_game = require("./penalty_king_API/cancelled_game");

exports = module.exports = router;

var port = 8082;
var server = http.createServer(app);
var io = require("socket.io")(server);
// io.origins('*:*');
// io.set('origins','192.168.0.121:80');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set(port);
server.listen(port);

server.on("listening",function(){
	var addr = server.address();
	console.log("Server on listening : "+addr.port);
})
// Add headers
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://192.168.0.121:8080');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
io.on("connection",function(socket)
{
  console.log("hello, its working!");
  // socket.on("show_friend",function(player_data)
  // {		
  // 	// var player_id=player_data.id;
  // 	// var player_status=player_data.status;
  // 	// if(player_status="in_friend_list")
  // 	// {
	 //  // 	setInterval(function()
	 //  // 	{
	 //  // 		show_friend.show_friend(player_id,socket.id,function (message)
	 //  // 		{

		// 	// 	io.to(message.data.sid).emit("friend_result",message);
	 //  // 		});
	 //  // 	},5000);
	  	
  // 	// }

  		
  // })
  socket.on("listening",function(simplefunction)
  {	
  		io.emit("popout",123);
  })
  socket.on("login",function(data)
  {	
  		socket.join(data);
  		 console.log(data);
  })
  socket.on("cincai",function(data)
  {
  	console.log("cincai "+data);
  	 io.in(data).emit("subscribe");
  })
});






function update_customer_detail_get(req,res){
	if(!req.query.id)
	{
		return res.json({
			 error: {
			 	status_code : 1,
			 	message :"id cannot be blank"
			 } 
		})
	}
	
	var customer_id = req.query.id;
	var customer_name = req.query.name;
	var customer_ic = req.query.ic;


	m.customer.update(
		{ name: customer_name, ic: customer_ic},
		{ where: {id:customer_id}
		});

	




	return res.json({
			 status: {
			 	status_code : 3,
			 	message :"successfully UPDATE a new customer using GET method"
			 } 
		})
}


// test("darylfoo");

// app.get('/user',function(req,res,next){
// 	test(req,res);
// });

// app.post('/user/post',function(req,res,next){
// 	test1(req,res);
// });


app.get('/updatecustomerget',function(req,res,next){
	update_customer_detail_get(req,res);
});



app.get('/',function(req,res){
	res.sendFile(__dirname+'/socket_io.html');
});


app.post('/initialize',function(req,res,next){
  initialize.initialize(req,res);
});


app.post('/',function(req,res,next){
	insert_striker_detail_post(req,res);
});
app.post('/create_avatar',function(req,res,next){
	create_avatar.create_avatar(req,res);
});
app.post('/add_friend',function(req,res,next){
	add_friend.add_friend(req,res);
});
app.post('/show_friend',function(req,res,next){
	show_friend.show_friend(req,res);
});
app.post('/delete_friend',function(req,res,next){
	delete_friend.delete_friend(req,res);
});
 
app.post('/sign_up',function(req,res,next){
	create_player.create_player(req,res);
});
app.post('/check_access_token',function(req,res,next){
	check_access_token.check_access_token(req,res);
});

app.post('/login',function(req,res,next){
	login_player.login_player(req,res);
});
app.post('/get_statistics',function(req,res,next){
	get_statistics.get_statistics(req,res);
});

app.post('/create_in_app_purchase',function(req,res,next){
	create_in_app_purchase.create_in_app_purchase(req,res);
});
app.post('/create_achievement',function(req,res,next){
	create_achievement.create_achievement(req,res);
});


app.post('/update_avatar',function(req,res,next){
	update_avatar.update_avatar(req,res);
});
app.post('/update_player',function(req,res,next){
	update_player.update_player(req,res);
});

app.post('/get_balance',function(req,res,next){
	get_balance.get_balance(req,res);
});



app.post('/start_game',function(req,res,next){
	start_game.start_game(req,res);
	
});
app.post('/cancelled_game',function(req,res,next){
	cancelled_game.cancelled_game(req,res);
	
});

app.post('/reward_player',function(req,res,next){
	reward_player.reward_player(req,res);
});

app.post('/create_robot',function(req,res,next){
	create_robot.create_robot(req,res);
});

app.post('/menu_api',function(req,res,next){
	menu_api.menu_api(req,res);
});


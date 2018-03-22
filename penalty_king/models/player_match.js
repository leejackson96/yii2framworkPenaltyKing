module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('player_match', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		match_id : DataTypes.INTEGER,
		player_id : DataTypes.INTEGER,
		opponent_id : DataTypes.INTEGER,
		striker_id : DataTypes.INTEGER,
		keeper_id : DataTypes.INTEGER,
		score : DataTypes.STRING(250),
		result : DataTypes.STRING(100),
		status : DataTypes.STRING(100),
		start_time : Date(),
		end_time : Date(),
		amount : DataTypes.DOUBLE,
		created_at : Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		
		tableName: "player_match"
	});
	return model;
}
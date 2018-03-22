module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('player_achievement', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		player_id : DataTypes.INTEGER,
		achievement_id : DataTypes.INTEGER,
		current_exp : DataTypes.DOUBLE,
		status: DataTypes.INTEGER(1),
		created_at : Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		
		tableName: "player_achievement"
	});
	return model;
}
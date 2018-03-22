module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('statistics', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		player_id : {
			type: DataTypes.INTEGER
		},
		total_match : DataTypes.INTEGER,
		total_blocks : DataTypes.INTEGER,
		total_goals : DataTypes.INTEGER,
		total_win : DataTypes.INTEGER,
		created_at : Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		
		tableName: "statistics"
	});
	return model;
}
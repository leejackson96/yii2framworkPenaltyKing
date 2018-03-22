module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('result', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		match_id : DataTypes.INTEGER,
		winner_id : DataTypes.INTEGER,
		loser_id : DataTypes.INTEGER,
		pot_value : DataTypes.DOUBLE,
		pot_won : DataTypes.DOUBLE,
		created_at : Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		
		tableName: "result"
	});
	return model;
}
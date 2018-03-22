module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('match_type', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		name : DataTypes.STRING(100),
		buy_in : DataTypes.DOUBLE,
		created_at : Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		
		tableName: "match_type"
	});
	return model;
}
module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('match', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		status : DataTypes.STRING(100),
		name : DataTypes.STRING(100),
		created_at : Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		
		tableName: "match"
	});
	return model;
}
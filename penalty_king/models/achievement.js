module.exports = function(sequelize,DataTypes){
	var model = sequelize.define('achievement', {
		id : {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		} , 
		name:DataTypes.STRING(100),
		description : DataTypes.STRING(250),
		total_exp : DataTypes.DOUBLE,
		created_at : Date(),
		updated_at : Date(),
		deleted_at : Date(),
	},{
		
		tableName: "achievement"
	});
	return model;
}
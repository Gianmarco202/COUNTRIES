const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('activities', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    name: {
      type: DataTypes.STRING,
      
    },
    difficulty: {
        type: DataTypes.ENUM('1','2','3','4','5'),
        
    },

    duration: {
        type: DataTypes.INTEGER,
    
    },
    season: {
        type: DataTypes.ENUM('Verano','Otoño','Invierno','Primavera')
    },
    countriesId: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }

  });
};

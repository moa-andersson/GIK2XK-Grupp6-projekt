module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING(255),
        validate: {
          isUrl: true,
        },
      },
    },
    { underscored: true }
  );
};

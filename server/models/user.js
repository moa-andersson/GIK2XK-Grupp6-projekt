module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(50),
        validate: {
          len: [4, 50],
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [5, 50],
        },
      },
    },
    { underscored: true }
  );
};

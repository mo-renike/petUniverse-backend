
export default (sequelize, DataTypes) => {
  const PetOwner = sequelize.define("PetOwner", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  return PetOwner;
};

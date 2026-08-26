import { sequalize } from "../config/sqlConfig";
import { DataTypes, Model, Sequelize } from "sequelize";
const MessageMOdel = sequalize.define("Message", {
  id: {
    type: DataTypes.UUID(),
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4(),
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiver: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
});

export default MessageMOdel;

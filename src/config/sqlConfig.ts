import { Sequelize } from "sequelize";
import { sqlConfig } from "./appConfig";

export const sequalize = new Sequelize(sqlConfig.url as string, {
  dialect: sqlConfig.dialect as any,
  database: sqlConfig.name as string,
  logging: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

(async () => {
  try {
    await sequalize.authenticate();
    console.log(" SQL connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the  sql database:", error);
    process.exit(1);
  }
})();

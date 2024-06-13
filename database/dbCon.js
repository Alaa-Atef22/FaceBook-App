import { Sequelize } from "sequelize"


const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'bycny6yusqosfjidrmr5-mysql.services.clever-cloud.com',
  port: '3306',
  database: 'bycny6yusqosfjidrmr5',
  username: 'ukkcyo9957trekjp',
  password: 'RPvoTn1sRIlUvzhXorvo',
});

  sequelize
  .authenticate()
  .then(() => {
    "database connected successfully";
  })
  .catch((err) => {
    console.log(err)
  })

 
  export default sequelize

  
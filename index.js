const mongoose = require("mongoose");
const app = require("./app");
const PORT_SERVER = process.env.PORT || 3977;
const { API_VERSIO, IP_SERVER, PORT_DB, API_VERESION } = require("./config");

mongoose.connect(
  `mongodb://${IP_SERVER}:${PORT_DB}/proyect_db`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Succes conection to db");
      
      app.listen(PORT_SERVER, () => {
        console.log("se esta escuchando el puerto", PORT_SERVER);
        console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERESION}/`);
      });
    }
  }
);

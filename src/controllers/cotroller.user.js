//librería para encriptar password
const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user.model");

function signUp(req, res) {
  console.log('inicial --->',User(req.body));
  const user = new User();
  const { name, lastname, email, password, repeatPassword } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email;
  /* por defecto almacenamos rol y si es un usuario o no */
  user.role = "admin";
  user.active = true;
  console.log('final --->',user);
  /* si no exixte una de las password */
  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las contraseñas son obligatorias" });
  } else {
    if (password !== repeatPassword) {
      res.status(404).json({ message: "Las cotraseñas no coinciden" });
    } else {
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) {
          res.status(500).json({ message: "Error al encriptar contraseña" });
        } else {
          user.password = hash;
          user.save((err, userStored) => {
            if (err) {
              res.status(500).json({ message: "El usuario ya existe" });
            } else {
              if (!userStored) {
                res.ststus(400).json({ message: "Error al crear el usuario" });
              } else {
                res.status(200).json({ user: userStored });
              }
            }
          });
        }
      });
    }
  }
}

const getUser = (req, res)=>{
    const users = User.find()
    console.log({users});
    res.json('users');
}

module.exports = {signUp, getUser}

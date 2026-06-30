const bcrypt = require("bcryptjs");
const User = require("../models/User");

function registerUser(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || ! email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  return bcrypt.hash(password, 10);
}
then(function (hashedPassword) {
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  return bycrypt.hash(password, 10);
})
.then(function (hashedPassword) {
  if (!hashedPassword) {
    return;
  }
  
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword
  });

  return user.save();
})
.then(function (savedUser) {
  if (!savedUser) {
     return;
  }
  
  res.status(201).json({
  message: "Registration successful",
  user: {
    id: savedUser._id,
    name: savedUser.name,
    email: savedUser.email,
    role: savedUser.role
  }
});

  return user.save();
})
.then(function (savedUser) {
  if (!savedUser) {
    return;
  }

  res.status(201).json({
    message: "Registration successful",
    user: {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role
    }
  });
})
.catch(function (error) {
      res.status(500).json({
        message: "Registration failed",
        error: error.message
      });
    });

function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  let foundUser;

  User.findOne({ email: email })
    .then(function (user) {
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      foundUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(function (isMatch) {
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      res.status(200).json({
        message: "Login successful",
        user: {
          id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser
        }
      });
    })
    .catch(function (error) {
      res.status(500).json({
        message: "Login failed",
        error: error.message
      });
    });
}

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser
}
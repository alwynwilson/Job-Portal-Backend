const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    if(result.status==201){
    res.status(201).json(result);

    }else if(result.status == 409){
      res.status(409).json(result);
    }
  } catch (err) {
    res.status(400).json('Registration failed.. Try again later');
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.json(result);
  } catch (err) {
    res.status(401).json('Login failed.. Try again later');
  }
};
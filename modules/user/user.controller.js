
import bcrypt from 'bcrypt'
import User  from '../../database/models/user.model.js'


//register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    req.session.user = user;
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

//logout
  const logout = async (req, res) => {
    req.session.user = null;
    res.status(200).json({ message: 'Logged out successfully' })
  };




export {
  register,login
,logout
};

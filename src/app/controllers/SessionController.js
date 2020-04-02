import jwt from "jsonwebtoken";
import * as Yup from "yup";
import User from "../models/User";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: "Validation fail" });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password doesn't match" });
    }

    const { id, name } = user;

    const token = jwt.sign({ id }, "36c4536996ca5615dcf9911f068786dc", {
      expiresIn: "7d"
    });

    return res.json({
      name,
      email,
      token
    });
  }
}

export default new SessionController();

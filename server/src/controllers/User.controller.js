const UserService = require("../services/User.Service");

class UserController {
    static async createUser(req, res) {
        const { username, email, password } = req.body;
        console.log(username, email, password, req.body);
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;

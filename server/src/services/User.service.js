const { User } = require('../db/models');

class UserService {
    static async createUser(userData) {
        const user = await User.create(userData);
        return user;
    }
    static async getUserByEmail(email) {
        const user = await User.findOne({ where: { email } });
        return user;
    }
    static async getUserById(id) {
        const user = await User.findByPk(id);
        return user;
    }
    static async updateUser(id, userData) {
        const user = await User.update(userData, { where: { id } });
        return user;
    }
    static async deleteUser(id) {
        const user = await User.destroy({ where: { id } });
        return user;
    }
    static async getAllUsers() {
        const users = await User.findAll();
        return users;
    }
    static async getUserByUsername(username) {
        const user = await User.findOne({ where: { username } });
        return user;
    }
    
}
module.exports = UserService;
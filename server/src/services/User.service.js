const { User } = require('../db/models');

class UserService {
    static async create(userData) {
        const user = await User.create(userData);
        return user;
    }
    static async getByEmail(email) {
        const user = await User.findOne({ where: { email } });
        return user;
    }
    static async getById(id) {
        const user = await User.findByPk(id);
        return user;
    }
    static async update(id, userData) {
        const user = await User.update(userData, { where: { id } });
        return user;
    }
    static async delete(id) {
        const user = await User.destroy({ where: { id } });
        return user;
    }
    static async getAll() {
        const users = await User.findAll();
        return users;
    }
    static async getByUsername(username) {
        const user = await User.findOne({ where: { username } });
        return user;
    }
    
}
module.exports = UserService;
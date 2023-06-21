/** user.service.js */
const Users = require('../models/user.model')

module.exports = class UserService {
    constructor() { }
    async AddUser(user) {
        try {
            const saved = await Users.create(user)
            return { error: false, data: saved }
        } catch (error) {
            return { error: true, data: error }
        }
    }

    async GetUsers() {
        try {
            const list = await Users.find({})
            return { error: false, data: list }
        } catch (error) {
            return { error: true, data: error }
        }
    }
}
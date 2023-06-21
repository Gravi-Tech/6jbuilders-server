/** user.control.js */
const  UserService  = require("../services/user.service")
const service = new UserService()
module.exports = class UserController {
    constructor() {}
    static async AddUser(req, res) {
        try {
            const result = await service.AddUser(req.body)
            return res.json(result)
        } catch (error) {
            return res.json({ error: true, data: error })
        }
    }

    static async GetUsers(req, res) {
        try {
            const result = await service.GetUsers()
            return res.json(result)
        } catch (error) {
            return res.json({ error: true, data: error })
        }
    }
}
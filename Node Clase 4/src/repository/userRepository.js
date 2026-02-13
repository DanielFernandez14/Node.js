import User from "../models/userModel.js"

export async function createUser(email, password) {
    const user = await User.create({ email, password })
    return user
}

export async function buscarUserPorId(user_id) {
    const user = await User.findById(user_id)
    return user
}

export async function buscarPorEmail(email) {
    const user = await User.findOne({ email })
    return user
}

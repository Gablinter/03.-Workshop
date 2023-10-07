let User = require('../models/User');

exports.create = (userData) => User.create(userData);

exports.getAll = async () => await User.find({})

exports.getByUsername = async (username) => await User.find({ username })
const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {

	console.log('STORE DISLIKE CONTROLLER');
    const { user } = req.headers;
    const { devID } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devID);

    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exist!" });
    }

    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};

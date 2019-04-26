const { signup, signin } = require("./controllers/authentication");
const passport = require("passport");
require("./services/passport");
const { ObjectId } = require("mongoose").Types;
const Plant = require("./models/plant");
const User = require("./models/user");
const Comment = require("./models/comment");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = app => {
  app.get("/", (req, res, next) => {
    res.send("This is API for plant App");
  });

  // Plants API
  app.get("/api/plants", requireAuth, async (req, res, next) => {
    const plants = await Plant.find({});

    res.json(plants);
  });

  app.post("/api/plants", requireAuth, async (req, res, next) => {
    const { name, image, description } = req.body;
    const newPlant = new Plant({
      name,
      image,
      description
    });
    try {
      const plant = await newPlant.save();

      res.json(plant);
    } catch (err) {
      return next(err);
    }
  });
  app.get("/api/plants/:id", requireAuth, async (req, res, next) => {
    const { id } = req.params;
    const plant = await Plant.findOne({ _id: new ObjectId(id) });
    const comments = await Comment.find({ plant: { id: new ObjectId(id) } });

    res.json({ plant, comments });
  });

  // TODO Comments API
  app.post("/api/plants/:id/comments", requireAuth, async (req, res, next) => {
    const { id: plantId } = req.params;
    const { text } = req.body;

    const newComment = new Comment({
      text,
      plant: { id: new ObjectId(plantId) }
    });
    try {
      const comment = await newComment.save();

      res.json(comment);
    } catch (err) {
      return next(err);
    }
  });

  //   Auth API
  app.post("/signin", requireSignin, signin);
  app.post("/signup", signup);
};

const UserProfile = require("../models/profile");
const formidable = require("formidable");
const fs = require("fs");

/**
 * @author Ravi Bharti
 ** @description - user profile controller
 */

//Add user profile
const addProfile = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  const userid = req.userid;
  form.parse(req, (err, fields, file) => {
    if (err) return res.status(400).json({ error: `somthing wrong: ${err.message}` }); //handling error
    // if (!fields)
    //     return res.status(400).json({ message: "Include all fields" });
    let profile = new UserProfile();
    if (file.photo) {
      if (file.photo.size > 5 * 1024 * 1024)
        return res.status(400).json({ message: "file size to big" });
      profile.photo.data = fs.readFileSync(file.photo.path);
      profile.photo.contentType = file.photo.type;
    }
    profile._id = userid;
    profile.userid = userid;
    profile.save((err, userProfile) => {
      if (err) {
        return res.json({
          error: err.message,
          message: "unable to create post",
        });
      }
      return res.status(200).json({
        message: "Profile Save Successfully",
        userProfile,
      });
    });
  });
};

//Get current user profile
const getProfile = (req, res) => {
  UserProfile.findById(req.query.profile_id, (err, userProfile) => {
    if (err) return res.status(404).json({ message: err.message });
    userProfile.photo = undefined;
    res.json(userProfile);
  });
};
//Get All User profile
const getAllProfile = (req, res) => {
  UserProfile.find()
    .select("-photo")
    .exec((err, profiles) => {
      if (err) return res.status(404).json({ message: err.message });
      res.json(profiles);
    });
};
//get profile photo
const getProfilePhoto = (req, res, next) => {
  return UserProfile.findById(req.query.userid).exec((err, profile) => {
    if (err) return res.status(400).send("unable to fetch photo");
    if (profile.photo.data) {
      res.set("Content-Type", profile.photo.contentType);
      res.send(profile.photo.data);
    }
    next();
  });
};
//Get a profile
const getOneProfile = (req, res) => {
  UserProfile.findOne({ _id: req.query.profile_id }, (err, userProfile) => {
    if (err) return res.status(404).json({ message: err.message });
    userProfile.photo = undefined;
    res.json(userProfile);
  });
};
const updateProfile = (req, res) => {
  //Todo: FixeMe;
  return res.json({
    message: "Under Development",
  });
};

module.exports = {
  addProfile,
  getProfile,
  getOneProfile,
  getAllProfile,
  getProfilePhoto,
  updateProfile,
};

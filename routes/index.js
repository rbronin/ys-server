var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("test routes");
});

router.get("/query", (req, res) => {
  const query = req.query;
  res.json({
    query1: req.query.id,
    query2: query.post_id,
  });
});

router.get("/param/:hey", (req, res) => {
  res.json({
    param: req.params.name,
  });
});

module.exports = router;

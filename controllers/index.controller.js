

module.exports.index =  (req,res,next) => {
  try {
    res.json({
      message: "hello world"
    })
  } catch (err) {
    next(err);
  }
}

function checkUrl(req, res, next) {
  if (req.url !== '/' && req.url !== '/home') {
    res.redirect('/');
  } else {
    next();
  }
}

module.exports = checkUrl;

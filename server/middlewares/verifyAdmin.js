module.exports = (req, res, next) => {
  const { currentUser } = req;
  const isAdmin =
    currentUser?.role === 'admin' || currentUser?.role === 'super-admin';

  if (isAdmin) {
    next();
    return;
  }

  res.status(401).json({ message: 'bye bda' });
};

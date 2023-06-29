const authUser = (req, res) => {
  res.status(200).json({ message: "Authenticated" });
};

export { authUser };

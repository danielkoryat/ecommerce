const notFound = (req, res) => {
  return res.status(404).json({ error: "Rout does not exist" });
};

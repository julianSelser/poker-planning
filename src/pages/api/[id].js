// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//TODO: probably not being used, remove if so
export default function room(req, res) {
  console.log("from pages/[id].js")
  res.status(200).json({ name: req.query.id })
}
import { RequestHandler, Router } from 'express'
const router = Router()

router.get('/', (req, res, _next) => {
  const ipAddresses = req.header('x-forwarded-for');
  res.send(ipAddresses + ' origin ip');
  // res.json(req.socket.address())
});

export default router
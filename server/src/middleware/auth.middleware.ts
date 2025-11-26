import { jwtUtils } from "../utils/jwt"

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwtUtils.verify(token)
    req.user = decoded // attach to request
    next()
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}

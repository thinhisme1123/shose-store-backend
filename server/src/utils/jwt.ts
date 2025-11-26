import jwt from "jsonwebtoken"

export const jwtUtils = {
  sign(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    })
  },

  verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!)
  }
}

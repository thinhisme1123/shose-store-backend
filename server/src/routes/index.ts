import { Express } from "express";
import productRoute from './product-route'
import emailRoute from './order-email-route'
import accountRoute from './account-route'
import reviewRoute from './review-route'
import cartRoute from './cart-route'

export const mainRoutes = (app: Express) => {
    app.use("/auth", accountRoute)
    app.use("/product", productRoute);
    app.use("/review", reviewRoute);
    app.use("/email", emailRoute)
    app.use("/cart", cartRoute)
};

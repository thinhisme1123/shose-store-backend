import { Express } from "express";
import productRoute from './product-route'
import emailRoute from './order-email-route'
import accountRoute from './account-route'

export const mainRoutes = (app: Express) => {
    app.use("/auth", accountRoute)
    app.use("/product", productRoute);
    app.use("/email", emailRoute)
};

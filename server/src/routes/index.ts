import { Express } from "express";
import productRoute from './product-route'
import emailRoute from './order-email-route'

export const mainRoutes = (app: Express) => {
    app.use("/product", productRoute);
    app.use("/email", emailRoute)
};

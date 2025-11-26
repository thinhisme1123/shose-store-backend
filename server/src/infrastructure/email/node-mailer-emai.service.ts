import nodemailer, { Transporter } from "nodemailer";
import { Order } from "../../domain/entities/order";
import dotenv from "dotenv";

dotenv.config();

export class NodeMailerEmailService {
  private transporter: Transporter;
  private from: string;
  private storeTo: string;

  constructor() {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const store = process.env.STORE_EMAIL || user;

    if (!user || !pass) {
      throw new Error("EMAIL_USER and EMAIL_PASS must be set in .env");
    }

    this.from = user;
    this.storeTo = store;

    this.transporter = nodemailer.createTransport({
      service: "gmail", // ok for simple usage. For production consider a transactional provider.
      auth: { user, pass },
    });

    // Optional: verify connection at startup (logs but doesn't crash)
    this.transporter
      .verify()
      .then(() => {
        console.log("✅ Nodemailer ready");
      })
      .catch((err) => {
        console.warn("⚠️ Nodemailer verify failed:", err.message || err);
      });
  }

  private formatOrderHtml(order: Order) {
    const items = order.orderDetails.items
      .map(
        (i) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">
            ${i.title} ${i.size ? `(${i.size})` : ""} ${
          i.color ? `- ${i.color}` : ""
        }
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;" align="center">${
            i.quantity
          }</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;" align="right">$${i.price.toFixed(
            2
          )}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;" align="right">$${(
            i.price * i.quantity
          ).toFixed(2)}</td>
        </tr>
      `
      )
      .join("");

    const formattedPaymentMethod =
      order.paymentMethod === "bank-transfer"
        ? "🏦 Bank Transfer"
        : order.paymentMethod === "cod"
        ? "💵 Cash on Delivery"
        : order.paymentMethod;

    return `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
    <h2 style="text-align:center; color:#2c3e50;">🛒 New Order Confirmation</h2>
    <p style="text-align:center; color:#888;">Order ID: <strong>${
      order.orderDetails.orderId
    }</strong><br/>Date: ${new Date(
      order.orderDetails.orderDate
    ).toLocaleString()}</p>

    <h3 style="border-bottom:1px solid #eee; padding-bottom:5px;">👤 Customer Info</h3>
    <p>
      Name: <strong>${order.firstName} ${order.lastName}</strong><br/>
      Email: ${order.email}<br/>
      Phone Number:  ${order.phoneNumber} 
    </p>

    <h3 style="border-bottom:1px solid #eee; padding-bottom:5px;">🚚 Shipping Address</h3>
    <p>
      ${order.address}<br/>
      ${order.apartment ? order.apartment + "<br/>" : ""}${order.city}${
      order.state ? ", " + order.state : ""
    } ${order.zip || ""}
    </p>

    <h3 style="border-bottom:1px solid #eee; padding-bottom:5px;">🛍️ Items Ordered</h3>
    <table style="width:100%; border-collapse: collapse; margin-top: 10px;">
      <thead>
        <tr style="background:#f8f8f8;">
          <th style="padding: 8px; text-align:left;">Item</th>
          <th style="padding: 8px; text-align:center;">Qty</th>
          <th style="padding: 8px; text-align:right;">Price</th>
          <th style="padding: 8px; text-align:right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${items}
      </tbody>
    </table>

    <h3 style="border-bottom:1px solid #eee; padding-bottom:5px; margin-top:20px;">💰 Order Summary</h3>
    <table style="width:100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 5px;">Subtotal:</td>
        <td style="padding: 5px;" align="right">$${order.orderDetails.subtotal.toFixed(
          2
        )}</td>
      </tr>
      <tr>
        <td style="padding: 5px;">Shipping:</td>
        <td style="padding: 5px;" align="right">${
          order.orderDetails.shippingCost === 0
            ? "Free"
            : "$" + order.orderDetails.shippingCost.toFixed(2)
        }</td>
      </tr>
      <tr>
        <td style="padding: 5px;">Tax:</td>
        <td style="padding: 5px;" align="right">$${order.orderDetails.tax.toFixed(
          2
        )}</td>
      </tr>
      <tr style="font-weight:bold; border-top: 2px solid #333;">
        <td style="padding: 8px;">Total:</td>
        <td style="padding: 8px;" align="right">$${order.orderDetails.total.toFixed(
          2
        )}</td>
      </tr>
      <tr>
        <td style="padding: 8px; color:#555;">Payment Method:</td>
        <td style="padding: 8px; text-align:right; color:#2c3e50;"><strong>${formattedPaymentMethod}</strong></td>
      </tr>
    </table>

    <p style="text-align:center; margin-top:30px; font-size:14px; color:#555;">
      ✅ Thank you for your order! We’ll notify you once it ships.
    </p>
  </div>
  `;
  }

  async sendOrderToStore(order: Order): Promise<void> {
    const subject = `New Order: ${order.orderDetails.orderId}`;

    await this.transporter.sendMail({
      from: this.from,
      to: this.storeTo, // store email
      subject,
      html: this.formatOrderHtml(order),
    });
  }
}

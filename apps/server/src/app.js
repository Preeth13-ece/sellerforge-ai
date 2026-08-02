import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";

import { corsOptions } from "./config/corsOptions.js";
import { globalLimiter } from "./config/rateLimit.js";
import { sanitizeInput } from "./middlewares/sanitize.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { generateSitemap } from "./seo/sitemapGenerator.js";


// Routes
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import toolsRoutes from "./modules/tools/tools.routes.js";
import historyRoutes from "./modules/history/history.routes.js";
import favoriteRoutes from "./modules/favorites/favorite.routes.js";
import downloadRoutes from "./modules/downloads/download.routes.js";
import blogRoutes from "./modules/blog/blog.routes.js";
import newsletterRoutes from "./modules/newsletter/newsletter.routes.js";
import affiliateRoutes from "./modules/affiliate/affiliate.routes.js";
import subscriptionRoutes from "./modules/subscriptions/subscription.routes.js";
import feedbackRoutes from "./modules/feedback/feedback.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";


// Razorpay webhook controller
import { razorpayWebhook } from "./modules/subscriptions/subscription.controller.js";


const app = express();


app.set(
  "trust proxy",
  1
);


// Security
app.use(
  helmet()
);


app.use(
  cors(corsOptions)
);


app.use(
  globalLimiter
);



// Razorpay webhook
// MUST come before express.json()
app.post(
  "/api/v1/subscriptions/webhook",
  express.json(),
  razorpayWebhook
);



// Body parsers
app.use(
  express.json({
    limit: "1mb",
  })
);


app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use(
  cookieParser()
);


// Sanitize
app.use(
  mongoSanitize()
);


app.use(
  sanitizeInput
);




// Health check
app.get(
  "/health",
  (req, res) => {

    res.status(200).json({
      status: "ok",
      uptime: process.uptime(),
    });

  }
);




// Sitemap
app.get(
  "/sitemap.xml",
  async (req, res, next) => {

    try {

      const xml =
        await generateSitemap();


      res.setHeader(
        "Content-Type",
        "application/xml"
      );


      res.send(xml);


    } catch (err) {

      next(err);

    }

  }
);




// Robots
app.get(
  "/robots.txt",
  (req, res) => {

    res.type(
      "text/plain"
    )
    .send(
`User-agent: *
Allow: /
Sitemap: ${
process.env.CLIENT_URL || ""
}/sitemap.xml`
    );

  }
);





const API_BASE = "/api/v1";


// API routes
app.use(
  `${API_BASE}/auth`,
  authRoutes
);


app.use(
  `${API_BASE}/users`,
  userRoutes
);


app.use(
  `${API_BASE}/tools`,
  toolsRoutes
);


app.use(
  `${API_BASE}/history`,
  historyRoutes
);


app.use(
  `${API_BASE}/favorites`,
  favoriteRoutes
);


app.use(
  `${API_BASE}/downloads`,
  downloadRoutes
);


app.use(
  `${API_BASE}/blog`,
  blogRoutes
);


app.use(
  `${API_BASE}/newsletter`,
  newsletterRoutes
);


app.use(
  `${API_BASE}/affiliate`,
  affiliateRoutes
);


app.use(
  `${API_BASE}/subscriptions`,
  subscriptionRoutes
);


app.use(
  `${API_BASE}/feedback`,
  feedbackRoutes
);


app.use(
  `${API_BASE}/analytics`,
  analyticsRoutes
);


app.use(
  `${API_BASE}/admin`,
  adminRoutes
);





// Error handling
app.use(
  notFound
);


app.use(
  errorHandler
);



export default app;

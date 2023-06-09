const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const cors = require('cors');
const serviceRoutes = require('./route/serviceRoutes');
const blogRoutes = require('./route/blogRoutes');
const categoryRoutes = require('./route/categoryRoutes');
const projectsRoutes = require('./route/projectsRoutes');
const emailRoutes = require('./route/emailRoutes');
const adminRoutes = require('./route/adminRoutes');
const adminDashboardStatsCountRoute=require('./route/adminDashboardStatsCountRoute')
const store = new MongoDBStore({
  uri: 'mongodb+srv://kirato:nutcases123@cluster0.jw8vu.mongodb.net/efko',
  collection: 'sessions',
});

store.on('error', (error) => {
  console.error('Session store error:', error);
});

const app = express();

app.use(bodyParser.json());

// Enable CORS
app.use(cors());

app.use('/admin', adminRoutes);
app.use(express.json());
app.use('/service', serviceRoutes);
app.use('/blog', blogRoutes);
app.use('/blog/category', categoryRoutes);
app.use('/project', projectsRoutes);
app.use('/email', emailRoutes);
app.use('/count', adminDashboardStatsCountRoute);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.all("*", (req, res, next) => {
  // Handle 404 error or other middleware here
});

module.exports = app;

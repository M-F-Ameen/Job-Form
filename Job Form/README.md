# Job Application Form - Full Stack Project

A complete job application form with admin panel built with Node.js, Express, MongoDB, and vanilla JavaScript.

## 🚀 Features

- **Job Application Form**: Multi-step form with file upload
- **Admin Panel**: View, manage, and export applications
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Live data management
- **Excel Export**: Download applications as CSV
- **Password Protection**: Secure admin access

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **File Upload**: Multer
- **Styling**: Custom CSS with responsive design

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd job-form
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy environment template
cp backend/env.example backend/.env

# Edit the .env file with your MongoDB connection string
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access the Application
- **Job Form**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin (Password: 12345)

## 🌐 Deployment Options

### Option 1: Render.com (Recommended - Free)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New Web Service"
   - Connect your GitHub repository

3. **Configure Service**
   ```
   Name: job-application-form
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Environment Variables**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   NODE_ENV=production
   FRONTEND_URL=https://your-app-name.onrender.com
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)

### Option 2: Railway.app (Free Tier)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy from GitHub**
   - Click "Deploy from GitHub repo"
   - Select your repository

3. **Environment Variables**
   - Add the same variables as Render

4. **Deploy**
   - Railway will auto-deploy on every push

### Option 3: Heroku (Paid but Reliable)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_connection
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

## 🔧 Environment Variables

Create a `.env` file in the `backend` folder:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS in production)
FRONTEND_URL=https://your-domain.com
```

## 📁 Project Structure

```
job-form/
├── index.html          # Job application form
├── admin.html          # Admin panel
├── style.css           # Main styles
├── script.js           # Frontend JavaScript
├── backend/
│   ├── working-server.js    # Main server file
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── uploads/             # File uploads
│   └── .env                 # Environment variables
├── package.json
└── README.md
```

## 🔒 Security Features

- **CORS Protection**: Configured for production
- **Input Validation**: Server-side validation
- **File Upload Security**: Restricted file types
- **Admin Password**: Configurable via admin panel

## 📱 Mobile Responsive

- **Responsive Design**: Works on all screen sizes
- **Touch-Friendly**: Optimized for mobile devices
- **Fast Loading**: Optimized for mobile networks

## 🚀 Performance Tips

1. **Enable Compression**: Add compression middleware
2. **CDN**: Use CDN for static assets
3. **Caching**: Implement proper caching headers
4. **Database Indexing**: Index frequently queried fields

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Check your connection string
   - Ensure IP whitelist includes your server

2. **CORS Errors**
   - Update FRONTEND_URL in environment variables
   - Check browser console for specific errors

3. **File Upload Issues**
   - Ensure uploads directory exists
   - Check file size limits

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review the code comments
- Create an issue in the repository

## 📄 License

MIT License - feel free to use this project for your own applications!

---

**Happy Deploying! 🚀** 
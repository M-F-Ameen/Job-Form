const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration for production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? [process.env.FRONTEND_URL || '*'] 
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://weallinsurgent:g5Q2IXBhoSgDLcv3@cluster0.nybvzhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully!');
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
    });

// Basic routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin.html'));
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Job Application API is working!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Job Application Schema
const jobApplicationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    governorate: { type: String, required: true },
    major: { type: String, required: true },
    graduationYear: { type: String, required: true },
    applicationType: { type: String, required: true },
    skills: { type: String, required: true },
    expectedSalary: { type: String, default: '' },
    availabilityDate: { type: String, default: '' },
    status: { type: String, default: 'pending' },
    reviewedBy: { type: String, default: '' },
    reviewedAt: { type: Date },
    submittedAt: { type: Date, default: Date.now }
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

// API Routes
app.post('/api/applications/submit', async (req, res) => {
    try {
        const applicationData = req.body;
        
        // Create new application
        const newApplication = new JobApplication({
            ...applicationData,
            submittedAt: new Date()
        });

        const savedApplication = await newApplication.save();
        
        console.log('✅ Application saved to database:', {
            id: savedApplication._id,
            fullName: savedApplication.fullName,
            email: savedApplication.email,
            phone: savedApplication.phone,
            governorate: savedApplication.governorate,
            major: savedApplication.major,
            graduationYear: savedApplication.graduationYear,
            applicationType: savedApplication.applicationType,
            skills: savedApplication.skills
        });

        res.json({ 
            success: true, 
            message: 'Application submitted successfully',
            applicationId: savedApplication._id 
        });
    } catch (error) {
        console.error('❌ Error saving application:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to save application' 
        });
    }
});

// Get all applications
app.get('/api/applications', async (req, res) => {
    try {
        const applications = await JobApplication.find().sort({ submittedAt: -1 });
        res.json({ 
            success: true, 
            applications: applications 
        });
    } catch (error) {
        console.error('❌ Error fetching applications:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch applications' 
        });
    }
});

// Get application by ID
app.get('/api/applications/:id', async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ 
                success: false, 
                error: 'Application not found' 
            });
        }
        res.json({ 
            success: true, 
            application: application 
        });
    } catch (error) {
        console.error('❌ Error fetching application:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch application' 
        });
    }
});

// Update application status
app.put('/api/applications/:id/status', async (req, res) => {
    try {
        const { status, reviewedBy } = req.body;
        const application = await JobApplication.findByIdAndUpdate(
            req.params.id,
            { 
                status, 
                reviewedBy, 
                reviewedAt: new Date() 
            },
            { new: true }
        );
        
        if (!application) {
            return res.status(404).json({ 
                success: false, 
                error: 'Application not found' 
            });
        }
        
        res.json({ 
            success: true, 
            application: application 
        });
    } catch (error) {
        console.error('❌ Error updating application:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to update application' 
        });
    }
});

// Delete application
app.delete('/api/applications/:id', async (req, res) => {
    try {
        console.log('🗑️ DELETE request received for ID:', req.params.id);
        
        const application = await JobApplication.findByIdAndDelete(req.params.id);
        
        if (!application) {
            return res.status(404).json({ 
                success: false, 
                error: 'Application not found' 
            });
        }
        
        console.log('🗑️ Application deleted:', application._id);
        
        res.json({ 
            success: true, 
            message: 'Application deleted successfully' 
        });
    } catch (error) {
        console.error('❌ Error deleting application:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to delete application' 
        });
    }
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.listen(PORT, () => {
    console.log('🚀 Server running on port', PORT);
    console.log('📝 Job Form: http://localhost:' + PORT);
    console.log('🔗 Admin Panel: http://localhost:' + PORT + '/admin');
    console.log('🔗 API Test: http://localhost:' + PORT + '/api/test');
}); 
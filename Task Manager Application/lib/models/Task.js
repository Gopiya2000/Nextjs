import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
    taskName: {
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    dueDate: { 
        type: Date, 
        required: true 
    },
    priority: {
        type: String, 
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
}, { timestamps: true });

// Export the model or reuse existing one
export default mongoose.models.Task || mongoose.model('Task', TaskSchema);

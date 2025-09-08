const mongoose = require('mongoose');
const identificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageInfo: {
        originalName: {
            type: String,
            required: true
        },
        fileId: {
            type: String,
            required: true
        },
        metadata: {
            width: Number,
            height: Number,
            format: String,
            size: Number
        }
    },
    prediction: {
        success: {
            type: Boolean,
            required: true
        },
        predictions: [{
            rank: Number,
            plant_name: String,
            confidence: Number,
            confidence_percentage: Number,
            scientificName: String,
            family: String,
            medicinalUses: [String],
            preparation: String,
            precautions: String,
            confidenceLevel: String
        }],
        recommendedActions: [String],
        total_classes: Number
    },
    processingTime: {
        type: Number, // in milliseconds
        default: 0
    },
    feedback: {
        isCorrect: {
            type: Boolean,
            default: null
        },
        actualPlantName: {
            type: String,
            default: null
        },
        userComments: {
            type: String,
            default: null
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: null
        }
    },
    location: {
        latitude: Number,
        longitude: Number,
        address: String
    },
    tags: [String],
    isPublic: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Indexes for better query performance
identificationSchema.index({ userId: 1, createdAt: -1 });
identificationSchema.index({ 'prediction.predictions.plant_name': 1 });
identificationSchema.index({ 'prediction.predictions.confidence': -1 });
identificationSchema.index({ createdAt: -1 });
identificationSchema.index({ isPublic: 1 });
// Virtual for top prediction
identificationSchema.virtual('topPrediction').get(function() {
    if (this.prediction && this.prediction.predictions && this.prediction.predictions.length > 0) {
        return this.prediction.predictions[0];
    }
    return null;
});
// Virtual for success rate calculation
identificationSchema.virtual('successRate').get(function() {
    if (this.prediction && this.prediction.predictions && this.prediction.predictions.length > 0) {
        return this.prediction.predictions[0].confidence_percentage;
    }
    return 0;
});
// Static method to get user statistics
identificationSchema.statics.getUserStats = async function(userId) {
    const stats = await this.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId) } },
        {
            $group: {
                _id: null,
                totalIdentifications: { $sum: 1 },
                successfulIdentifications: {
                    $sum: {
                        $cond: [{ $eq: ['$prediction.success', true] }, 1, 0]
                    }
                },
                averageConfidence: {
                    $avg: '$prediction.predictions.0.confidence'
                },
                mostIdentifiedPlants: {
                    $push: '$prediction.predictions.0.plant_name'
                }
            }
        }
    ]);
    return stats[0] || {
        totalIdentifications: 0,
        successfulIdentifications: 0,
        averageConfidence: 0,
        mostIdentifiedPlants: []
    };
};
// Static method to get global statistics  
identificationSchema.statics.getGlobalStats = async function() {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                totalIdentifications: { $sum: 1 },
                uniqueUsers: { $addToSet: '$userId' },
                mostPopularPlants: {
                    $push: '$prediction.predictions.0.plant_name'
                },
                averageConfidence: {
                    $avg: '$prediction.predictions.0.confidence'
                }
            }
        },
        {
            $addFields: {
                uniqueUserCount: { $size: '$uniqueUsers' }
            }
        }
    ]);
    return stats[0] || {
        totalIdentifications: 0,
        uniqueUserCount: 0,
        mostPopularPlants: [],
        averageConfidence: 0
    };
};
// Instance method to add feedback
identificationSchema.methods.addFeedback = function(feedbackData) {
    this.feedback = {
        ...this.feedback,
        ...feedbackData,
        updatedAt: new Date()
    };
    return this.save();
};
// Pre-save middleware to calculate processing time
identificationSchema.pre('save', function(next) {
    if (this.isNew) {
        this.processingTime = Date.now() - (this._startTime || Date.now());
    }
    next();
});
const Identification = mongoose.model('Identification', identificationSchema);
module.exports = Identification;

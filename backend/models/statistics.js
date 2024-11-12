const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  humidity: {
    mean: Number,
    median: Number,
    mode: Number,
    standardDeviation: Number,
    skewness: Number,
    kurtosis: Number,
    futureProjection: Number,
    probability: Number,
    distribution: String,
  },
  temperature: {
    mean: Number,
    median: Number,
    mode: Number,
    standardDeviation: Number,
    skewness: Number,
    kurtosis: Number,
    futureProjection: Number,
    probability: Number,
    distribution: String,
  },
}, { timestamps: true });

const Statistics = mongoose.model('Statistics', statisticsSchema);

module.exports = Statistics;

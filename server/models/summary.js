import mongoose, { Schema } from 'mongoose';

const summarySchema = new Schema({
  createdAt: {
    type: Date,
    expires: 5184000,
    default: Date.now
  },
  site: {
    type: String,
    default: "unknown"
  },
  reportURL: {
    type: String,
    default: ""
  },
  env: {
    type: String,
    default: "live"
  },
  suites: {
    type: Number,
    default: 0
  },
  tests: {
    type: Number,
    default: 0
  },
  passes: {
    type: Number,
    default: 0
  },
  pending: {
    type: Number,
    default: 0
  },
  failures: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  testsRegistered: {
    type: Number,
    default: 0
  },
  passPercent: {
    type: Number,
    default: 0
  },
  pendingPercent: {
    type: Number,
    default: 0
  },
  other: {
    type: Number,
    default: 0
  },
  hasOther: {
    type: Boolean,
    default: false
  },
  skipped: {
    type: Number,
    default: 0
  },
  hasSkipped: {
    type: Boolean,
    default: false
  }
});

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;

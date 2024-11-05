const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  content: String,
  type: { type: String, enum: ['text', 'image', 'video'], default: 'text' },
  timestamp: { type: Date, default: Date.now }
});

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  messages: [messageSchema],
  lastMessage: { type: String }
});

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;

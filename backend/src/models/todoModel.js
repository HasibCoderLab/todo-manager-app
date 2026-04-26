import mongoose from 'mongoose';
import {todo_status, validation, validStatus} from '../constants/index.js';

const todoSchema = new mongoose.Schema({
 title: {
   type: String,
   required: [true, 'title is required'],
   trim: true,
   maxLength: [validation.title_max_length, `title cannot exceed ${validation.title_max_length} characters`]
 },
 description: {
   type: String,
   required: [true, 'description is required'],
   trim: true,
   maxLength: [validation.description_max_length, `title cannot exceed ${validation.description_max_length} characters`]
 },
  status: {
   type: String,
   enum: {
     values: validStatus,
     message: `status must be on ${validStatus.join(', ')}`
   },
   default: todo_status.active
  }
},
  {timestamps: true, versionKey: false})

todoSchema.index({ status: 1, createdAt: -1 });

export const Todo = mongoose.model('todos', todoSchema)
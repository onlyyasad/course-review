import { model, Schema } from 'mongoose'
import { TCourse, TDetails, TTag } from './course.interface'

const tagSchema = new Schema<TTag>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
})

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  instructor: {
    type: String,
    trim: true,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: [tagSchema],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  language: {
    type: String,
    trim: true,
    required: true,
  },
  provider: {
    type: String,
    trim: true,
    required: true,
  },
  details: detailsSchema,
})

export const Course = model<TCourse>('Course', courseSchema)

import { Types } from 'mongoose'

export type TTag = {
  name: string
  isDeleted: boolean
}

export type TDetails = {
  level: string
  description: string
}

export type TCourse = {
  title: string
  instructor: string
  categoryId: Types.ObjectId
  price: number
  tags: TTag[]
  startDate: Date
  endDate: Date
  language: string
  provider: string
  details: TDetails
}

export type TCourseUpdates = {
  $set: Record<string, unknown>
  $push: Record<string, unknown>
}

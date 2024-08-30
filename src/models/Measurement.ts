import mongoose, { Schema, Document } from "mongoose";

export interface IMeasurement extends Document {
  measure_uuid: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: string;
  measure_value: number;
  has_confirmed: boolean;
  image_url: string;
}

const MeasurementSchema: Schema = new Schema({
  measure_uuid: { type: String, required: true, unique: true },
  customer_code: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, required: true },
  measure_value: { type: Number, required: true },
  has_confirmed: { type: Boolean, default: false },
  image_url: { type: String, required: true },
});

export const Measurement = mongoose.model<IMeasurement>(
  "Measurement",
  MeasurementSchema
);

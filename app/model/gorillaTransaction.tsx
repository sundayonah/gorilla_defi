
import mongoose, { Document, Schema } from "mongoose";

// Define interface for the document
interface IGorillaTransaction extends Document {
  amount: number;
  reward: number;
  address: string;
  timestamp: Date;
  // Add any other fields you need
}

// Define schema using the interface
const transactionSchema = new Schema<IGorillaTransaction>({
  amount: { type: Number },
  reward: { type: Number },
  address: { type: String},
  timestamp: { type: Date },
  // Add any other fields you need
});

// Create a model from the schema
const GorillaTransaction =
  mongoose.models.GorillaTransaction ||
  mongoose.model<IGorillaTransaction>('GorillaTransaction', transactionSchema);

// Export the model
export default GorillaTransaction;

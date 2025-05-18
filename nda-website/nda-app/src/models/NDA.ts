import mongoose, { Schema, Document } from 'mongoose';

export interface INDA extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  signedDate: Date;
  ipAddress?: string;
}

const NDASchema: Schema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  signedDate: { 
    type: Date, 
    default: Date.now 
  },
  ipAddress: { 
    type: String 
  }
});

// Check if the model is already defined to prevent overwriting during hot reloads
export default mongoose.models.NDA || mongoose.model<INDA>('NDA', NDASchema);

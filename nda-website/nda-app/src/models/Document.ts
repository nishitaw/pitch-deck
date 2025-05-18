import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  description?: string;
  url: string;
  createdAt: Date;
}

const DocumentSchema: Schema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  url: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Check if the model is already defined to prevent overwriting during hot reloads
export default mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);

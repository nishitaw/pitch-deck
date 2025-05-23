import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  name: string;
  company?: string;
  password?: string;
  hasSignedNDA: boolean;
  ndaSignedDate?: Date;
  isAdmin: boolean;
  createdAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  password: {
    type: String,
    select: false // Don't include password in query results by default
  },
  hasSignedNDA: {
    type: Boolean,
    default: false
  },
  ndaSignedDate: {
    type: Date
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  // Cast to any first to avoid TypeScript errors with mongoose Document types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = this as any;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the salt
    if (user.password) {
      user.password = await bcrypt.hash(user.password, salt);
    }
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    const user = this as unknown as { password?: string };
    if (!user.password) return false;
    return await bcrypt.compare(candidatePassword, user.password);
  } catch {
    return false;
  }
};

// Check if the model is already defined to prevent overwriting during hot reloads
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

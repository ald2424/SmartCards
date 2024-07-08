import { Schema, model, Document } from 'mongoose';

export interface IFlashcard extends Document {
    question: string;
    shortAnswer: string;
    longAnswer?: string;
    category: Schema.Types.ObjectId;
}

 const flashcardSchema = new Schema<IFlashcard>({
    question: {
        type: String,
        required: true,
    },
    shortAnswer: {
        type: String,
        required: true,
    },
    longAnswer: {
        type: String,
        required: false,
    },
    category: { 
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
 });

 export const Flashcard = model<IFlashcard>('Flashcard', flashcardSchema);
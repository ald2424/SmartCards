import { Schema, model, Types} from 'mongoose';

export interface IFlashcard {
    _id: Types.ObjectId;
    question: string;
    shortAnswer: string;
    longAnswer?: string;
    category: Types.ObjectId;
}

export interface IFlashcardCreation {
  question: string;
  shortAnswer: string;
  longAnswer?: string;
  category: Types.ObjectId;
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
     ref: "Category",
     required: true,
   },
 });

 const Flashcard = model<IFlashcard>('Flashcard', flashcardSchema);
 export default Flashcard;
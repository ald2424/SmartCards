import { Schema, model, Document } from 'mongoose';
import { Flashcard } from './Flashcard';

export interface ICategory extends Document {
    name: string;
}

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
});

//pre-hook to handle cascading delete
categorySchema.pre('findOneAndDelete', async function (next) {
    const category = await this.model.findOne(this.getQuery());
    if(category) {
        await Flashcard.deleteMany({ category: category._id});
    }
    next();
});

export const Category = model<ICategory>('Category', categorySchema);
import { Schema, model, Types } from 'mongoose';
import  Flashcard  from './Flashcard';

export interface ICategory {
    _id: Types.ObjectId;
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

 const Category = model<ICategory>('Category', categorySchema);
 export default Category;
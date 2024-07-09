import { Request, Response } from 'express';
import { Category } from '../models/Category';
import errorHandler from "../middlewares/errorHandler";

export const createCategory = errorHandler(async (req: Request, res: Response) => {
    const { name } = req.body;
    const category = new Category({name});
    await category.save();
    res.status(201).json(category);
});

export const getCategories = errorHandler(async (req: Request, res: Response) => {
    const categories = await Category.find();
    res.status(200).json(categories);
});

export const UpdateCategory = errorHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(id, { name }, {new: true});
    if(!category) {
        return res.status(404).json({message: 'Category not found.'});
    }
    res.status(200).json(category);

});

export const deleteCategory = errorHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if(!category) {
        return res.status(404).json({ message: 'Category not found.' });
    } 
    res.status(200).json({ message: 'Category deleted.' })
});

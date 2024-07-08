import { Request, Response } from 'express';
import { Category } from '../models/Category';

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const category = new Category({name});
        await category.save();
        res.status(201).json(category);
    } catch(error) {
        res.status(500).json({message: 'Server error', error});
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch(error) {
        res.status(500).json({ message: 'Server error', error});
    }
};

export const UpdateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(id, { name }, {new: true});
        if(!category) {
            return res.status(404).json({message: 'Category not found.'});
        }
        res.status(200).json(category);
    } catch(error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if(!category) {
            return res.status(404).json({ message: 'Category not found.' });
        } 
        res.status(200).json({ message: 'Category deleted.' })
    } catch(error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({
      success: true,
      message: "Food item added successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error in adding food item",
    });
  }
};

//list all food items

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error in fetching food items",
    });
  }
};

//remove food item

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    
    if (!food) {
      return res.json({
        success: false,
        message: "Food item not found"
      });
    }

    // Delete the image file if it exists
    if (food.image) {
      fs.unlink(`uploads/${food.image}`, () => {});
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Food item removed successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error in removing food item",
    });
  }
};

export { addFood, listFood, removeFood };

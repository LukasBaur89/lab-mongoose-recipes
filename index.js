const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const res = require("express/lib/response");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    // Iteration 2
    const myRecipe = Recipe.create({
      title: "Lasagne",
      level: "Amateur Chef",
      ingredients: ["minced-meat", "onions", "tomato-paste", "lasagne-sheets"],
      cuisine: "International",
      dishType: "main_course",
      image:
        "https://www.gutekueche.at/storage/media/recipe/102205/conv/lasagne-bolognese-default.jpg",
      duration: "90",
      creator: "Lukas",
      created: "2022-04-29",
    });

    // Iteration 3
    // insert data from data.json
    const newData = Recipe.insertMany(data)
      // returns a promise
      .then((dataFromFile) => {
        // iterate over array and print out title
        dataFromFile.forEach((item) => {
          console.log(item.title);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// Iteration 4

const updateRigatoni = Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 },
  { new: true }
)
  .then((updatedTitle) => {
    console.log("Successful updated:", updatedTitle);
  })
  .catch((err) => {
    console.log(err);
  });

// Iteration 5
// Delete Carrot Cake

// Find Carrot Cake
/* Recipe.find({ title: "Carrot Cake" }).then((data) => console.log(data)); */
const deleteCarrotCake = Recipe.deleteOne({ title: "Carrot Cake" }).then(
  (message) => {
    console.log("Successful removed:", message);
  }
);
/* Recipe.find({}).then((data) => console.log(data)); */

// Iteration 6
mongoose.connection.close();

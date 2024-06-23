const express = require("express");
const { MongoClient } = require("mongodb");

// Initialize the Express app
const app = express();

// MongoDB connection URI
const uri = "mongodb+srv://basillal1010:OrWVHT3y6Z8hXwPq@store.2p1clix.mongodb.net/?retryWrites=true&w=majority&appName=store";

// Create a new MongoClient
const client = new MongoClient(uri);

// Function to run the database operation
function run() {
  return new Promise(async (resolve, reject) => {
    try {
      // Connect to the MongoDB client
      await client.connect();
      
      // Select the database and collection
      const database = client.db('store');
      console.log("db passed")
      const movies = database.collection('movies');

      const newMovie = {
          title: 'Back to the Future',
          year: 1985,
          genre: ['Adventure', 'Comedy', 'Science Fiction'],
          director: 'Robert Zemeckis',
          actors: ['Michael J. Fox', 'Christopher Lloyd']
        };
    
        const result = await movies.insertOne(newMovie);
        console.log(`A movie was inserted with the following id: ${result.insertedId}`);

      // Perform the query
      const query = { title: 'Back to the Future' };
      const movie = await movies.findOne(query);
      console.log(movie);

      resolve(); // Resolve the promise when operation is successful
    } catch (error) {
      console.error("An error occurred:", error);
      reject(error); // Reject the promise if there's an error
    } finally {
      // Close the connection to the MongoDB client
      await client.close();
    }
  });
}

// Start the Express server
app.get("/", (req, res) => {
  run().then(() => {
    res.send("Express on Verccccel");
  }).catch((error) => {
    console.error(error);
    res.status(500).send("Failed to fetch movie");
  });
});

app.listen(3000, () => console.log("Server ready on port 3000."));

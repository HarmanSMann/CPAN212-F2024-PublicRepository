// Ha - it wont be posted until the end of next week, nice try

// ----------  Comparison Queries  ----------
db.laptops.find({ price: { $ne: 1299.99 } });
db.laptops.find({ price: { $gt: 1500 } });
db.laptops.find({ price: { $gte: 1399.99 } });
db.laptops.find({ price: { $lt: 1000 } });
db.laptops.find({ price: { $lte: 1099.99 } });
// ----------  Logical Queries  ----------
db.laptops.find({ $or: [{ price: { $lt: 1000 } }, { stock: { $gt: 10 } }] });
db.laptops.find({ $and: [{ price: { $lt: 1000 } }, { stock: { $gt: 10 } }] });
db.laptops.find({ price: { $not: { $eq: 999.99 } } });
db.laptops.find({
  $nor: [{ price: { $eq: 999.99 } }, { stock: { $eq: 8 } }],
});
// ----------  Element Queries  ----------
db.laptops.find({ description: { $exists: true } });
db.laptops.find({ reviews: { $exists: false } });
// ----------  Array Queries  ----------
// These will return nothing because there is no "genre" field

db.laptops.find({ genres: "Gaming" });
db.laptops.find({ genres: { $in: ["Business"] } });
db.laptops.find({ genres: { $all: ["Fiction", "Adventure"] } });
// ----------  Text Search Queries  ----------
// This will not work because there is no assigned indexes to the Collection, so the first thing to do is make an index.
db.laptops.createIndex({ description: "text" });
db.laptops.find({ $text: { $search: "performance" } });
// ----------  Array Update Queries  ----------
db.laptops.updateOne(
  { title: "Laptop Title" },
  { $push: { reviews: { user: "JohnD", rating: 4 } } }
);
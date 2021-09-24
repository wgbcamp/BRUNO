const { MongoClient } = require("mongodb");

const client = new MongoClient('mongodb://localhost:27017/');

const database = client.db('admin');
const collection = database.collection('test');

client.connect();

//find one document
async function findOneFN(){

        const query = { name: "Neapolitan pizza" };
        const result = await collection.findOne(query);
        console.log(result);
}

//insert one document
async function insertOneFN(){

        const doc = { name: "Neapolitan pizza", shape: "round"};
        const result = await collection.insertOne(doc);
        console.log(`Document inserted: ${JSON.stringify(result)}`);
}

//insert many documents
async function insertManyFN(){

        const docs = [
            { "_id": 1, "color": "red"},
            { "_id": 2, "color": "purple"},
            { "_id": 3, "color": "yellow"},
            { "_id": 4, "color": "blue"}
        ];

        const insertManyresult = await collection.insertMany(docs);
        let ids = insertManyresult.insertedIds;

        console.log(`Documents inserted: ${JSON.stringify(ids)}`);
}

//delete one docuement
async function deleteOneFN(){

        const doc = {
            _id:{
                $gt: 0,
                $lt: 5
            }
        }
        const deleteResult = await collection.deleteOne(doc);
        console.dir(deleteResult.deletedCount);
}

//delete many documents
async function deleteManyFN(){

        const doc = {
            _id:{
                $gt: 0,
                $lt: 5,
            }
        }
        const deleteManyResult = await collection.deleteMany(doc);
        console.dir(deleteManyResult.deletedCount);
}

//update one document
async function updateOneFN(){

        const filter = {name: "Neapolitan pizza"};
        const updateDocument = {
            $set: {
                name: "Spanish Paella"
            },
        };
        const result = await collection.updateOne(filter, updateDocument);
        console.dir(result.acknowledged);
}

//replace one document
async function replaceOneFN(){

    const filter = {name: "Neapolitan pizza"};
    const replacementDocument = {
        shape: "hexagon",
    };
    const result = await collection.replaceOne(filter, replacementDocument);
    console.dir(result.modifiedCount);
}

//insert two complex objects
async function insertTwoComplexObjectsFN(){
    const doc = [
        {
            name: "Steve Lobsters",
            address: "731 Yexington Avenue",
            items: [
                {
                    type: "beverage",
                    name: "Water",
                    size: "17oz"
                },
                {
                    type: "pizza",
                    size: "large",
                    toppings: ["pepperoni"],
                },
                {
                    type: "pizza",
                    size: "medium",
                    toppings: ["mushrooms", "sausage", "green peppers"],
                    comment: "Extra green peppers please!",
                },
                {
                    type: "pizza",
                    size: "large",
                    toppings: ["pineapple, ham"],
                    comment: "red pepper flakes on top",
                },
                {
                    type: "calzone",
                    fillings: ["canadian bacon", "sausage", "onion"],
                },
                {
                    type: "beverage",
                    name: "Diet Pepsi",
                    size: "16oz",
                },
            ],
        },
    {
        name: "Popeye",
        address: "1 Sweethaven",
        items: [
            {
                type: "pizza",
                size: "large",
                toppings: ["garlic, spinach"],
            },
            {
                type: "calzone",
                toppings: ["ham"],
            },
        ],
    }]

    const result = await collection.insertMany(doc);
    console.log(`Document inserted: ${JSON.stringify(result)}`);
}

//update one array element
async function updateArrayElementFN(){

    const query = { name: "Steve Lobsters", "items.type": "pizza" };
    const updateDocument = { 
        $set: { "items.$.size": "extra large" }
    };
    const result = await collection.updateOne(query, updateDocument);
    console.dir(result.acknowledged);
}

//update all array elements
async function updateAllArrayElementsFN(){
    const query = { "name": "Popeye" };
    const updateDocument = {
        $push: { "items.$[].toppings": "fresh mozzarella"}
    };
    const result = await collection.updateOne(query, updateDocument);
    console.dir(result.acknowledged);
}

//update specific elements in array
async function updateFilterFN(){
    const query = { name: "Steve Lobsters" };
    const updateDocument = {
        $push: { "items.$[orderItem].toppings": "garlic" }
    };
    const options = {
        arrayFilters: [{
            "orderItem.type": "pizza",
            "orderItem.size": "large"
        }]
    };

    const result = await collection.updateMany(query, updateDocument, options);
    console.dir(result.acknowledged);
}

//run test cases
async function runTest(){

    try{
        // await findOneFN();
        // await insertOneFN();
        // await insertManyFN();
        // await deleteOneFN();
        // await deleteManyFN();
        // await updateOneFN();
        // await replaceOneFN();

        // await insertTwoComplexObjectsFN();
        // await updateArrayElementFN();
        // await updateAllArrayElementsFN();
        // await updateFilterFN();
    }catch(err){
        console.dir(err)
    }
    await client.close();
}

runTest();
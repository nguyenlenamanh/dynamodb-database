var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing products into DynamoDB. Please wait.");

var allProducts = JSON.parse(fs.readFileSync('products.json', 'utf8'));

allProducts.forEach(function(product) {
    var params = {
        TableName: "Products",
        Item: {
            "CategoryName":  product.CategoryName,
            "ProductID": product.ProductID,
            "ProductName": product.ProductName,
            "TotalView" : product.TotalView,
            "Brand" : product.Brand,
            "Color" : product.Color,
            "Star" : product.Star
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add product, Error JSON:", JSON.stringify(err));
       } else {
           console.log("PutItem succeeded:");
       }
    });
});
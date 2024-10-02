# Install dependencies
```$ npm install```
# Running server
```$ node app.js```
- The server listens at port 3000
# APIs
#### Product model
     {
        id: 1,
        name: 'Bánh mì',
        description: 'Xốp, giòn và ngon lắm',
        img: "https://i.ex-cdn.com/vntravellive.com/files/news/2023/05/15/luu-ngay-5-quan-banh-mi-ngon-nen-thu-tai-sai-gon-151953.jpg",
        price: 100,
        stock: 50
    }
#### Getting all products
```GET http://localhost:3000/products```
#### Getting a products by id
```GET http://localhost:3000/products/1```
#### Creating a products
```POST http://localhost:3000/products```
#### Deleting a product by id
```DELETE http://localhost:3000/products/1```
#### Updating a product by id
```PUT http://localhost:3000/products/1```

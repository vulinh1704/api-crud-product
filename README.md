# Install dependencies
```$ npm install```
# Running server
```$ node index.js```
- The server listens at port 3000
# APIs
## APIs Products
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
```GET auth http://localhost:3000/products```
#### Getting a products by id
```GET auth http://localhost:3000/products/1```
#### Creating a products
```POST auth http://localhost:3000/products```
#### Deleting a product by id
```DELETE  auth http://localhost:3000/products/1```
#### Updating a product by id
```PUT auth http://localhost:3000/products/1```


## APIs Users
#### Register API
```POST http://localhost:3000/register```
     {
        username: "linh1704",
        password: 'vulinh',
    }
#### Login API
```POST http://localhost:3000/login```
     {
        username: "linh1704",
        password: 'vulinh',
    }
#### Getting info
```GET auth http://localhost:3000/get-info```
#### Update info
```PUT auth http://localhost:3000/update-info```
        {
            age: 12,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDYsXnM6pqyX8sLoPx8sexJkYdrepH5_jGk9r7sJLIwuXSl6XQIqOranTyyw&s',
            description: "Hoc binh thuong"
        }

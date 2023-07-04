import express, { Request, Response } from "express";
import cors from "cors";
import {
  users,
  products,
  createProduct,
  createTUser,
  getAllProducts,
  getAllUsers,
  searchProductByName,
} from "./database";
import { TProduct, TUsers } from "./types";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003, labecommerce");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Funciona! ");
});

app.get("/users", (req: Request, res: Response)=>{
    res.status(200).send(users)
})
//app.get é a requisiçao de pegar, e tem uma response. enviamos um status e o que encontrou no path**/products
app.get("/products",(req: Request, res: Response)=>{
    res.status(200).send(products)
})

app.get("/users/search", (req: Request, res: Response)=>{
    //queri params
    const name = req.query.name as string
    // para cada usuario dentro do array de usuarios
    const result = users.filter((user)=> user.name.toLowerCase().includes(name.toLowerCase()))
    res.status(200).send(result)
})
app.get("/products/search", (req: Request, res: Response)=>{
    const product = req.query.name as string
    const result = products.filter((prod)=>prod.name.toLowerCase().includes(product.toLowerCase()))
    res.status(200).send(result)
})
app.post("/users", (req: Request, res: Response)=>{
    const id = req.body.id as string
    const name = req.body.name as string
    const email =  req.body.email as string
    const password = req.body.password as string
    const createdAt = new Date().toISOString()
    const newUser: TUsers = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: createdAt
    }
    users.push(newUser)
    res.status(201).send("Usuario cadastrado com sucesso.")
})

app.post("/products", (req: Request, res: Response)=>{
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string

    const newProduct: TProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    }
    products.push(newProduct)
    //res da o status . send é a descriçao do que foi feito
    res.status(201).send("Produto cadastrado com sucesso")
})

app.put("/products/:id", (req: Request, res: Response)=>{
  const idToEdit = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newPrice = req.body.price as number | undefined
  const newDescription = req.body.description as string | undefined
  const newImageUrl = req.body.imageUrl as string | undefined

  const prod = products.find((prod)=> prod.id === idToEdit)

  if (prod){
    prod.id = newId || prod.id;
    prod.name = newName || prod.name;
    prod.description = newDescription || prod.description;
    prod.imageUrl = newImageUrl  || prod.imageUrl;

    prod.price = isNaN(Number(newPrice))? prod.price : newPrice as number;
  }
  res.status(200).send("Atualização realizada com sucesso")
})

app.put("/users/:id",(req: Request, res:Response)=>{
  const idToAlter = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newEmail = req.body.email as string | undefined
  const newPassword = req.body.password as string | undefined

  const user = users.find((user)=>user.id === idToAlter)
  if (user){
    user.id = newId || user.id;
    user.name = newName || user.name;
    user.email = newEmail || user.email;
    user.password = newPassword || user.password
  }

  res.status(200).send("Alteração realizada com sucesso")
})

app.delete('/users/:id', (req: Request, res: Response)=>{
  const idToDelete = req.params.id
  const userIndex = users.findIndex((user) => user.id === idToDelete)
  if (userIndex >= 0){
    users.splice(userIndex, 1)
  }
  res.status(200).send("Usuario excluido.")
})

app.delete('/products/:id', (req: Request, res: Response)=>{
  const idToRemove = req.params.id
  const productIndex = products.findIndex((prod) => prod.id === idToRemove)
  if (productIndex >=0){
    products.splice(productIndex, 1)
  }
  res.status(200).send('Produto excluido.')
})
// criar novo usuario
createTUser("u003", "Arthur", "arthur@email.com", "arthur1234");
//buscar usuarios
const allUsers = getAllUsers();
//criar novo produto
createProduct(
  "prod003",
  "SSD Gamer",
  349.99,
  "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
  "https://example.com/ssd-gamer.jpg"
);
//buscar produtos
// const allProducts = getAllProducts();
// const searchResults = searchProductByName("gamer");
// console.log("resultado da busca", searchResults);
console.table(products);
console.table(users);

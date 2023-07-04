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
    res.status(201).send("Produto cadastrado com sucesso")
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
const allProducts = getAllProducts();

const searchResults = searchProductByName("gamer");
console.log("resultado da busca", searchResults);
console.table(products);
console.table(users);

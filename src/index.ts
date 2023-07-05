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

app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});

app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(products);
});

app.get("/users/search", (req: Request, res: Response) => {
  const name = req.query.name as string;
  const result = users.filter((user) =>
    user.name.toLowerCase().includes(name.toLowerCase())
  );
  res.status(200).send(result);
});
app.get("/products/search", (req: Request, res: Response) => {
  try {
    const product = req.query.name as string;
    if (product.length === 0) {
      res
        .status(400)
        .send("O parametro da consulta deve ter ao menos um caractere");
    }
    const result = products.filter((prod) =>
      prod.name.toLowerCase().includes(product.toLowerCase())
    );
    res.status(200).send(result);
  } catch (error: any) {
    res.status(500).send("Ocorreu um erro na busca do produto");
  }
});

app.post("/users", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;
    const createdAt = new Date().toISOString();

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser uma string");
    }
    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser uma string");
    }
    if (typeof email !== "string") {
      res.status(400);
      throw new Error("'email' deve ser uma string");
    }
    if (typeof password !== "string") {
      res.status(400);
      throw new Error("'password' deve ser uma string");
    }
    if (typeof createdAt !== "string") {
      res.status(400);
      throw new Error("'createdAt' deve ser uma string");
    }

    const idAlready = users.filter((user) => user.id === id);
    if (idAlready.length > 0) {
      res.status(404);
      throw new Error("'id' já cadastrado");
    }
    const emailAlready = users.filter((user) => user.email === email);
    if (emailAlready.length !== 0) {
      res.status(404);
      throw new Error("'email' já cadastrado");
    }

    const newUser: TUsers = {
      id: id,
      name: name,
      email: email,
      password: password,
      createdAt: createdAt,
    };

    users.push(newUser);
    res.status(201).send("Usuario cadastrado com sucesso.");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.post("/products", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const imageUrl = req.body.imageUrl as string;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser uma string");
    }
    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser uma string");
    }
    if (typeof price !== "number") {
      res.status(400);
      throw new Error("'price' deve ser uma string");
    }
    if (typeof description !== "string") {
      res.status(400);
      throw new Error("'description' deve ser uma string");
    }
    if (typeof imageUrl !== "string") {
      res.status(400);
      throw new Error("'imageUrl' deve ser uma string");
    }

    const prodAlready = products.filter((prod) => prod.id === id);
    if (prodAlready.length !== 0) {
      res.status(404);
      throw new Error("'id' produto já cadastrado ");
    }

    const newProduct: TProduct = {
      id: id,
      name: name,
      price: price,
      description: description,
      imageUrl: imageUrl,
    };
    products.push(newProduct);
    //res da o status . send é a descriçao do que foi feito
    res.status(201).send("Produto cadastrado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;
    const already = products.find((p) => p.id === idToEdit);

    if (!already) {
      res.status(404).send("Produto não encontrado");
    } else {
      const newId = req.body.id as string | undefined;
      const newName = req.body.name as string | undefined;
      const newPrice = req.body.price as number | undefined;
      const newDescription = req.body.description as string | undefined;
      const newImageUrl = req.body.imageUrl as string | undefined;

      const prod = products.find((prod) => prod.id === idToEdit);

      if (prod) {
        prod.id = newId || prod.id;
        prod.name = newName || prod.name;
        prod.description = newDescription || prod.description;
        prod.imageUrl = newImageUrl || prod.imageUrl;

        prod.price = isNaN(Number(newPrice))
          ? prod.price
          : (newPrice as number);
      }
      res.status(200).send("Atualização realizada com sucesso");
    }
  } catch (error: any) {
    res.status(500).send("Ocorreu um erro na edição do produto");
  }
});

app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const idToAlter = req.params.id;
    const already = users.filter((user) => user.id === idToAlter);
    if (already.length === 0) {
      res.status(404).send("Usuário não encontrado");
    } else {
      const newId = req.body.id as string | undefined;
      const newName = req.body.name as string | undefined;
      const newEmail = req.body.email as string | undefined;
      const newPassword = req.body.password as string | undefined;

      const user = users.find((user) => user.id === idToAlter);
      if (user) {
        user.id = newId || user.id;
        user.name = newName || user.name;
        user.email = newEmail || user.email;
        user.password = newPassword || user.password;
      }
      res.status(200).send("Alteração realizada com sucesso");
    }
  } catch (error: any) {
    res.status(500).send("Ocorreu um erro na edição do produto");
  }
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const idToDelete = req.params.id;
  const userIndex = users.findIndex((user) => user.id === idToDelete);
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
  } else {
    res.status(404).send("Usuário não encontrado");
  }
  res.status(200).send("Usuario excluido.");
});

app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const idToRemove = req.params.id;

    const productIndex = products.findIndex((prod) => prod.id === idToRemove);
    if (productIndex >= 0) {
      products.splice(productIndex, 1);
    } else {
      res.status(404).send("produto não encontrado");
    }
    res.status(200).send("Produto excluido.");
  } catch (error: any) {
    res.status(500).send("Ocorreu ao deletar o produto");
  }
});

createTUser("u003", "Arthur", "arthur@email.com", "arthur1234");
createProduct(
  "prod003",
  "SSD Gamer",
  349.99,
  "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
  "https://example.com/ssd-gamer.jpg"
);

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
import { TProduct, TPurchase, TUsers } from "./types";
import { db } from "./database/knex";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003, labecommerce");
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
      res.status(200).send({ message: "Pong!" })
  } catch (error) {
      console.log(error)

      if (req.statusCode === 200) {
          res.status(500)
      }

      if (error instanceof Error) {
          res.send(error.message)
      } else {
          res.send("Erro inesperado")
      }
  }
})

//getAllUsers
app.get("/users", async (req: Request, res: Response) => {
  try {    
    const result = await db("users")
    .select("id","name","email")
    .orderBy('id',"asc")
    
    res.status(200).send(result,);
  } catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }  
});

app.get("/users/search", async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    const result = await db("users")
    .select()
    .where("name", "LIKE",`%${name}%`)

    res.status(200).send(result);    
  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("products")
    .orderBy("id","asc")
    res.status(200).send(result);
  }  catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.get("/products/search", async (req: Request, res: Response) => {

  try {
    const name = req.query.name as string;
    if (name !== undefined) {
      if (name.length < 1) {
        res.status(400)
        throw new Error("O nome deve ter mais de 1 (UM) caracter")
      }
    }
    const result = await db('products')

    if (name) {
      const resultFiltered = result.filter((product) => product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
      res.status(200).send(resultFiltered)
      return
    }
    res.status(200).send(result)

  }  catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
})

app.post("/users", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;
    const createdAt = new Date().toISOString() as string;

    if (id === undefined || id === ""){
      res.status(400);
      throw new Error("'id' deve ser preenchido");
    }
    if (id.length < 4) {
      res.status(400);
      throw new Error("'id' deve possuir pelo menos 4 caracteres");
    }
    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser uma string");
    }
    const [alreadyId]: TUsers[] | undefined[] = await db("users").where({id});
    if(alreadyId){
      res.status(400)
      throw new Error("'id' já cadastrado")
    }
    if (typeof name !== "string" || name.length < 2) {
      res.status(400);
      throw new Error("'name' deve ser uma string, e ter no minimo 2 caracteres");
    }
    if (typeof email !== "string" || email === "") {
      res.status(400);
      throw new Error("'email' deve ser uma string");
    }
    const [alreadyEmail]: TUsers[] | undefined [] = await db("users").where({email});
    if(alreadyEmail){
      res.status(400)
      throw new Error("'email' já cadastrado")
    }
    if (typeof password !== "string") {
      res.status(400);
      throw new Error("'password' deve ser uma string");
    }
    if (typeof createdAt !== "string") {
      res.status(400);
      throw new Error("'createdAt' deve ser uma string");
    }
    const newUser = {
      id,
      name,
      email,
      password,      
    };
    await db("users").insert(newUser);
    res.status(201).send("Usuário cadastrado com sucesso.")
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
        res.status(500)
    }
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.post("/products", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const imageUrl = req.body.imageUrl as string;

    if (typeof id !== "string" || id === undefined) {
      res.status(400);
      throw new Error("'id' deve ser uma string");
    }
    if (!id.startsWith("prod")) {
      res.status(400);
      throw new Error("O 'id' deve começar com a string 'prod'!");
    }
    const [alreadyIdProd]: TProduct[]| undefined[] = await db("products").where({id})
    if (alreadyIdProd){
      res.status(400);
      throw new Error("'Id' Já cadastrado")
    }

    if (typeof name !== "string" || name === undefined) {
      res.status(400);
      throw new Error("'name' deve ser uma string");
    }
    if (typeof price !== "number") {
      res.status(400);
      throw new Error("'price' deve ser uma numero");
    }
    if (description === undefined || description === "") {
      res.status(400);
      throw new Error("Preencher o descrição!");
    } else if (typeof description !== "string") {
      res.status(400);
      throw new Error("A descrição precisa ser uma string!");
    }
    if (imageUrl === undefined || imageUrl === "") {
      res.status(400);
      throw new Error("Preencher a url da imagem!");
    } else if (typeof imageUrl !== "string") {
      res.status(400);
      throw new Error("A url da imagem precisa ser uma string!");
    }


    const newProduct: TProduct ={
    id,
    name,
    price,
    description,
    imageUrl,
    }
    await db("products").insert(newProduct)
    res.status(201).send("Produto cadastrado com sucesso");
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
        res.status(500)
    }
    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});


app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const buyer = req.body.buyer;
    const productsP = req.body.products;

    if (id === undefined || id === "") {
      res.status(400);
      throw new Error("Preencher o id da compra!");
    } else if (typeof id !== "string") {
      res.status(400);
      throw new Error("O id precisa ser uma string!");
    }

    const [idExists]: TPurchase[] | undefined[] = await db("purchases").where(
      { id }
    );

    if (idExists) {
      res.status(400);
      throw new Error("Compra já existente!");
    }
    if (!id.startsWith("p")) {
      res.status(400);
      throw new Error("O id deve começar com a string 'p'!");
    }
    if (id.length < 4) {
      res.status(400);
      throw new Error("'id' deve possuir pelo menos 6 caracteres");
    }

    if (buyer === undefined || buyer === "") {
      res.status(400);
      throw new Error("Preencher o comprador!");
    } else if (typeof buyer !== "string") {
      res.status(400);
      throw new Error("O comprador precisa ser uma string!");
    }

    const [userExists]: TPurchase[] | undefined[] = await db("users").where({
      id: buyer,
    });

    if (!userExists) {
      res.status(400);
      throw new Error("Por favor, realize seu cadastro primeiro!");
    }

    if (!productsP) {
      res.status(400);
      throw new Error("Preencha os produtos da compra!");
    } else {
      for (const product of req.body.products) {
        if (!product.productId || !product.quantity) {
          res.status(400);
          throw new Error(
            "Os produtos da compra precisam ter id e quantidade!"
          );
        }
      }
    }

    if (
      !Array.isArray(productsP) ||
      productsP.length < 1 ||
      typeof productsP[0] !== "object"
    ) {
      res.status(400);
      throw new Error(
        "O campo products é obrigatório e deve ser um array de objetos."
      );
    }

    let totalPrice = 0;
    const productsWithInfo: Array<{ product: TProduct; quantity: number }> =
      [];

    for (const product of productsP) {
      if (!product.productId || typeof product.productId !== "string") {
        throw new Error("productId é obrigatório e deve ser uma string.");
      }
      const [productExists]: TProduct[] | undefined[] = await db(
        "products"
      ).where({ id: product.productId });

      if (!productExists) {
        res.status(404);
        throw new Error(`Produto com id ${product.productId} não encontrado`);
      }

      const productsSet = new Set<string>();
      for (const product of productsP) {
        if (productsSet.has(product.productId)) {
          res.status(404);
          throw new Error(
            `O produto com id ${product.productId} já foi adicionado a sua compra. Só é possível adicionar um id desse produto.`
          );
        }
        productsSet.add(product.productId);
      }

      if (!product.quantity || typeof product.quantity !== "number") {
        throw new Error("quantity é obrigatório e deve ser um número.");
      }
      const productWithInfo = {
        product: productExists,
        quantity: product.quantity,
      };
      productsWithInfo.push(productWithInfo);

      totalPrice += productExists.price * product.quantity;
      totalPrice = Number(totalPrice.toFixed(2));
    }

    const newPurchase: TPurchase = {
      id,
      buyer,
      totalPrice,
      products: productsWithInfo,
    };

    await db("purchases").insert({
      id: newPurchase.id,
      total_price: newPurchase.totalPrice,
      buyer: newPurchase.buyer,
    });

    for (const product of newPurchase.products) {
      await db("purchases_products").insert({
        purchase_id: newPurchase.id,
        product_id: product.product.id,
        quantity: product.quantity,
      });
    }

    res.status(201).send("Compra cadastrada com sucesso!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});
  
app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    let resultado;
    const idTosearch = req.params.id;
    const [resultado1] = await db
      .select(
        "purchases.id",
        "purchases.buyer AS buyerID",
        "users.name AS usersName",
        "users.email AS buyerEmail",
        "purchases.total_price",
        "purchases.created_at"
      )
      .from("purchases")
      .innerJoin("users", "purchases.buyer", "=", "users.id")
      .where("purchases.id", "=", idTosearch);

    const products = await db
      .select("*")
      .from("purchases_products")
      .where("purchases_products.purchase_id", "=", idTosearch);

    resultado = { ...resultado1, products };
    console.log(resultado);

    res.status(200).send(resultado);
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    console.log(error);
    res.send(error.message);
  }
});
app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const result = await db("purchases")
    .orderBy("id","asc")
    res.status(200).send(result);
  }  catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string

    if (id.length < 4 || !id.startsWith("p")) {
      if (id.length < 4) {
        throw new Error("O ID deve ter no minimo 4 caracteres e começar com a sigla 'purc'")
      }
      throw new Error("O ID deve começar com a sigla 'p'")
    }

    const [exist] = await db('purchases').where({ id })

    if (!exist) {
      throw new Error("Pedido não existe")
    }

    await db.delete().from('purchases').where({ id })

    res.status(200).send("Pedido cancelado com sucesso")
  }  catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
})

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number ;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    const [productToEdit]: TProduct[] | undefined[] = await db(
      "products"
    ).where({
      id,
    });

    if (productToEdit) {
      if (newId) {
        const [idExists]: TProduct[] | undefined[] = await db(
          "products"
        ).where({
          id: newId,
        });

        if (!idExists) {
          if (typeof newName !== "string") {
            res.status(400);
            throw new Error("Nome precisa ser uma string!");
          }
          if (newId.length < 7) {
            res.status(400);
            throw new Error("'id' deve possuir pelo menos 7 caracteres");
          }
          if (!newId.startsWith("prod")) {
            res.status(400);
            throw new Error("O 'id' deve começar com a string 'prod'!");
          }
        } else {
          res.status(400);
          throw new Error("O 'id' já existe!!");
        }
      }

      if (newName) {
        if (typeof newName !== "string") {
          res.status(400);
          throw new Error("Nome precisa ser uma string!");
        }
      }

      if (newPrice) {
        if (typeof newPrice !== "number") {
          res.status(400);
          throw new Error("O preço precisa ser um número!");
        }
      }

      if (newDescription) {
        if (typeof newDescription !== "string") {
          res.status(400);
          throw new Error("A descrição precisa ser uma string!");
        } else if (newDescription.length < 5) {
          res.status(400);
          throw new Error("A descrição deve conter no mínimo 5 caracteres!");
        }
      }

      if (newImageUrl) {
        if (typeof newImageUrl !== "string") {
          res.status(400);
          throw new Error("A nova url precisa ser uma string!");
        }
      }

      const newProduct: TProduct = {
        id: newId || productToEdit.id,
        name: newName || productToEdit.name,
        price: newPrice ? productToEdit.price : newPrice,
        description: newDescription || productToEdit.description,
        imageUrl: newImageUrl || productToEdit.imageUrl,
      };

      await db("products").update(newProduct).where({ id });
      res.status(200).send("Produto atualizado com sucesso!");
    } else {
      res.status(404);
      throw new Error("Produto não encontrado!");
    }
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});


























app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;
    const already = products.find((p) => p.id === idToEdit);

    if (!already) {
      res.status(404)
      throw new Error("Produto não encontrado"); // Lança um erro para interromper a execução
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
  }catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
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
  }catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
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
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string

    const [exist] = await db('users').where({ id });

    if (!exist) {
      res.status(400)
      throw new Error("Esse usuario não existe");
    }

    await db.delete().from('users').where({ id });

    res.status(200).send("Usuario apagado com sucesso");
  }catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const [exist] = await db('products').where({ id })
    console.log(exist,id)
    if (!exist) {
      res.status(400)
      throw new Error("Esse produto não existe")
    }
    await db.delete().from('products').where({ id })
    res.status(200).send("Produto apagado com sucesso")
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
})


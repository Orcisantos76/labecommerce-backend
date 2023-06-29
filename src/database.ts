import { TUsers, TProduct } from "./types";

//array de users
export const users: TUsers[] = [
  {
    id: "u001",
    name: "Orci",
    email: "orci@email.com",
    password: "orci1234",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u002",
    name: "Ana",
    email: "ana@email.com",
    password: "ana1234",
    createdAt: new Date().toISOString(),
  },
];
//array product
export const products: TProduct[] = [
  {
    id: "prod001",
    name: "Mouse gamer",
    price: 250,
    description: "Melhor mouse do mercado!",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
  },
  {
    id: "prod002",
    name: "Monitor",
    price: 900,
    description: "Monitor LED Full HD 24 polegadas",
    imageUrl: "https://picsum.photos/seed/Monitor/400",
  },
];

//Criar novo usuario

export function createTUser(
    id: string,
    name: string,
    email: string,
    password: string
): string {
    const createdAt = new Date().toISOString();

    const newTUser: TUsers={
        id,
        name,
        email,
        password,
        createdAt,
    };
    //para adicionar ao array existente
    users.push(newTUser);
    return "Cadastro realizado com sucesso";
}

//funcao buscar usuarios
export function getAllUsers(): TUsers[]{
    return users;
    // retorna o array users
}

export function createProduct(
    //recebe todos os tipos, de types.ts
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
): string{
    const newProdutct: TProduct={
        id,
        name,
        price,
        description,
        imageUrl,
    };
    products.push(newProdutct)
    return "Produto cadastrado com sucesso";
}
export function getAllProducts(): TProduct[]{
    return products;
}
// 
export function searchProductByName (name:string): TProduct[]{
    const searchTerm = name.toLowerCase()
//converte o resultado da busca para minuscula

    const searchResults = products.filter((product)=>
    //filtra pelo name em minuscula
    product.name.toLowerCase().includes(searchTerm))
    return searchResults;
    //retorna o resultado da busca
}
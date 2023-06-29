import { users, products, createProduct,createTUser,getAllProducts,getAllUsers,searchProductByName } from "./database"
console.log('funciona')

// criar novo usuario
createTUser(
    'u003',
    'Arthur',
    'arthur@email.com',
    'arthur1234'
);
//buscar usuarios
const allUsers = getAllUsers()
//criar novo produto
createProduct(
    'prod003',
    'SSD Gamer',
    349.99,
    'Acelere seu sistema com velocidades incríveis de leitura e gravação.',
    'https://example.com/ssd-gamer.jpg'
)
//buscar produtos
const allProducts = getAllProducts()

const searchResults = searchProductByName('gamer');
console.log('resultado da busca', searchResults)
console.table(products)
console.table(users)
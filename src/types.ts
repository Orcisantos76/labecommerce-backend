//aqui é feito a tipagem, onde diremos o que é cada tipo do elemento, para nao ter que declarar a cada novo elemento

export type TUsers = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;//data
};
export type TProduct ={
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}
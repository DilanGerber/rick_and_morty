const app = require('../src/app');
const session = require('supertest');
const request = session(app);

const character = {
    id: 55,
    name: "Dilan",
    species: "Human",
    gender: "Male",
    status: "Vivo",
    origin: {
        name: "Tierra"
    },
    image: "image.jpg"
}

describe("test de RUTAS", () => {
    describe("GET /rickandmorty/character/:id", () => {
        it("Responde con status: 200", async () => {
            const response = await request.get('/rickandmorty/character/1')
            expect(response.statusCode).toBe(200)
        })
        it("Responde un objeto con las propiedades: 'id', 'name', 'species', 'gender', 'status', 'origin' e 'image'", async () => {
            const response = await request.get('/rickandmorty/character/1')
            for (const prop in character) {
                expect(response.body).toHaveProperty(prop)
            }
        })
        it("Si hay un error responde con status: 500", async () => {
            const response = await request.get('/rickandmorty/character/3000')
            expect(response.statusCode).toBe(500)
        })
    })

    describe('GET /rickandmorty/login', () => {
        const access = { access: true }
        it("Responde un obeto con la propiedad access en true si los datos son validos", async () => {
            const response = await request.get('/rickandmorty/login?email=dilangerber@gmail.com&password=qqq111')
            expect(response.body).toEqual(access)
        })
        it("Responde un obeto con la propiedad access en false si los datos no son validos", async () => {
            const response = await request.get('/rickandmorty/login?email=dilangerber@gmail.com&password=qqf444')
            access.access = false
            expect(response.body).toEqual(access)
        })
    })
    describe("POST /rickandmorty/fav", () => {
        it("Debe guardar el peronaje en favoritos", async () => {
            const response = await request.post('/rickandmorty/fav').send(character)
            expect(response.body).toContainEqual(character)
        })
        it("Debe agregar personajes a favoritos sin cambiar los que ya existen", async () => {
            character.id = 777
            character.name = "rojo"
            const response = await request.post('/rickandmorty/fav').send(character)
            expect(response.body.length).toBe(2)
        })
    })
    describe("DELETE /rickandmorty/fav/:id", () => {
        it("Si el id no existe deberia retornar un array con todos los favoritos", async () => {
            const response = await request.delete('/rickandmorty/fav/2')
            expect(response.body.length).toBe(2)
        })
        it("Si el id existe deberia eliminarlo de favoritos", async () => {
            const response = await request.delete('/rickandmorty/fav/777')
            expect(response.body.length).toBe(1)
        })
    })
})
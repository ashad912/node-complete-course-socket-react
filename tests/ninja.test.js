import request from 'supertest'
import { app } from '../src/app'
import {Ninja} from '../src/models/ninja'
import {ninjaOneId, ninjaOne, setupDatabase} from './fixtures/db'


beforeEach(setupDatabase)

// beforeEach(async () => {
    
// }) 

/*OR
beforeEach((done) => {
    Ninja.deleteMany().then(()=> {
        done()
    })
}) 
*/
 
//afterEach()


test('Should signup a new ninja', async () => {
    const response = await request(app).post('/api/ninjas').send({
        name: 'Mario',
        email: 'mario10@ninja.com',
        password: '1234ninja10'
    }).expect(201)

    //assert that the db was changed correctly
    const ninja = await Ninja.findById(response.body.ninja._id)
    expect(ninja).not.toBeNull()
    

    //assertions about the response
    //expect(response.body.ninja.name).toBe('Mario')
    //expect(response.body.ninja.password).toBeUndefined()
    expect(response.body).toMatchObject({ //comparing all response object
        ninja: {
            name: 'Mario',
            email: 'mario10@ninja.com'
        },
        token: ninja.tokens[0].token
    })
    expect(ninja.password).not.toBe('1234ninja10')
})

test('Should login existing ninja', async () => {
    const response = await request(app).post('/api/ninjas/login').send({
        email: ninjaOne.email,
        password: ninjaOne.password
    }).expect(200)
    const ninja = await Ninja.findById(ninjaOneId)
    expect(response.body.token).toBe(ninja.tokens[1].token) //want to take second token - first was generated during singing up

})

test('Should not login existing ninja', async () => {
    await request(app).post('/api/ninjas/login').send({
        email: ninjaOne.email,
        password: 'halko2131243'
    }).expect(400)

    await request(app).post('/api/ninjas/login').send({
        email: 'ninja@ninja.com',
        password: ninjaOne.password
    }).expect(400)
})

test('Should get profile for ninja', async () => {
    await request(app)
        .get('/api/ninjas/me')
        .set('Authorization', `Bearer ${ninjaOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for ninja', async () => {
    await request(app)
        .get('/api/ninjas/me')
        .send()
        .expect(401)
})

test('Should delete account for ninja', async () => {
    await request(app)
        .delete('/api/ninjas/me')
        .set('Authorization', `Bearer ${ninjaOne.tokens[0].token}`)
        .send()
        .expect(200)
    const ninja = await Ninja.findById(ninjaOneId)
    expect(ninja).toBeNull()
})

test('Should not delete account for ninja', async () => {
    await request(app)
        .delete('/api/ninjas/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/api/ninjas/me/avatar')
        .set('Authorization', `Bearer ${ninjaOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')// 1st param - name of header, 2nd - loc of resource
        .expect(200)
    const ninja = await Ninja.findById(ninjaOneId)
    //expect({}).toBe({}) // {} !== {} different place in memory -> working with objects require toEqual!
    expect(ninja.avatar).toEqual(expect.any(Buffer))  //checkin if in avatar field is any Buffer

})

test('Should update valid ninja fields', async () => {
    await request(app)
        .put('/api/ninjas/me')
        .set('Authorization', `Bearer ${ninjaOne.tokens[0].token}`)
        .send({
            name: 'MarioKiller'
        })
        .expect(200)
    const ninja = await Ninja.findById(ninjaOneId)
    //expect(ninja.name).toBe('MarioKiller')
    expect(ninja.name).toEqual('MarioKiller')

})

test('Should not update valid ninja fields', async () => {
    await request(app)
        .put('/api/ninjas/me')
        .set('Authorization', `Bearer ${ninjaOne.tokens[0].token}`)
        .send({
            tokens: []
        })
        .expect(400)
    //const ninja = await Ninja.findById(ninjaOneId)
    //expect(ninja.tokens).not.toEqual([])

})


//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated
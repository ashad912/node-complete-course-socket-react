import request from 'supertest'
import { app } from '../src/app'
import {Quest} from '../src/models/quest'
import {ninjaOneId,
        ninjaOne,
        setupDatabase,
        ninjaTwoId,
        ninjaTwo,
        questOne,
        questTwo,
        questThree
    } from './fixtures/db'


beforeEach(setupDatabase)


test('Should create quest for ninja', async () => {
    const response = await request(app)
        .post('/quests')
        .set('Authorization', `Bearer ${ninjaOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
        const quest = await Quest.findById(response.body._id)
        expect(quest).not.toBeNull()
        expect(quest.completed).toEqual(false) //testing default
})

test('Should grab quests from provided ninja', async () => {
    const response = await request(app)
        .get('/quests')
        .set('Authorization', `Bearer ${ninjaOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toEqual(2)
})

test('Should not delete other users quests', async () => {
    const response = await request(app)
        .delete(`/quests/${questOne._id}`)
        .set('Authorization', `Bearer ${ninjaTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const quest = await Quest.findById(questOne._id)
    expect(quest).not.toBeNull()

})

//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks
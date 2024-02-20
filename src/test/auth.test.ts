/* eslint-disable @typescript-eslint/no-explicit-any */
import supertest from 'supertest'
import app from '../app'
import { startServer, closeServer, startDB, closeDB } from '../server'
import { adminUserPayload, userPayload } from './test-data'

let server: any
let adminToken: string
let emailVerificationToken: string
let userToken: string

beforeAll(async () => {
  await startDB({ force: true })
  server = await startServer()
  const { body } = await supertest(app)
    .post(`/api/v1/auth/register`)
    .send(adminUserPayload)

  adminToken = body.data.token
  console.log(adminToken)
  emailVerificationToken = body.verificationToken
})

afterAll(async () => {
  await closeDB()
  await closeServer(server)
})

describe('Register user', () => {
  it('should return CREATED 201', async () => {
    const { body, statusCode } = await supertest(app)
      .post(`/api/v1/auth/register`)
      .send(userPayload)

    userToken = body.data.token
    console.log(userToken)
    expect(statusCode).toBe(201)
    expect(body.data.user.username).toBe(userPayload.username)
    expect(body.data.user.email).toBe(userPayload.email)
  })

  it('should return SequelizeUniqueConstraintError 500', async () => {
    const { body, statusCode } = await supertest(app)
      .post(`/api/v1/auth/register`)
      .send(userPayload)
    expect(statusCode).toBe(500)
    expect(body.error.error).toBe('SequelizeUniqueConstraintError')
  })
})

describe('email verified', () => {
  it('should verify admin email', async () => {
    const { body, statusCode } = await supertest(app).get(
      `/api/v1/auth/verify?token=${emailVerificationToken}`,
    )

    expect(statusCode).toBe(200)
    expect(body.message).toBe('Email verified successfully')
  })
})

describe('Login user', () => {
  const userLoginPayload = {
    email: 'user@email.com',
    password: 'userpw',
  }

  const adminLoginPayload = {
    email: 'admin@email.com',
    password: 'adminpw',
  }

  it('Should NOT successfully log in 403', async () => {
    const { body, statusCode } = await supertest(app)
      .post(`/api/v1/auth/login`)
      .send(userLoginPayload)

    expect(statusCode).toBe(403)
    expect(body.error.error).toBe('ForbiddenError')
  })

  it('Should successfully log in 200', async () => {
    const { body, statusCode } = await supertest(app)
      .post(`/api/v1/auth/login`)
      .send(adminLoginPayload)
    console.log(body)
    expect(statusCode).toBe(200)
  })
})

// describe('User permission', () => {
//   it('should return unauthenticated 401', async () => {
//     const userId = 1 // get admin token here
//     await supertest(app).get(`/api/v1/auth/user/${userId}`).expect(401)
//   })

//   it('should return unauthorized 403', async () => {
//     const userId = 1 // get the token
//     await supertest(app)
//       .get(`/api/v1/auth/user/${userId}`)
//       .set('Authorization', `${userToken}`)
//       .expect(403)
//   })

//   it('should return OK 200', async () => {
//     const userId = 2 // update the
//     const { body, statusCode } = await supertest(app)
//       .get(`/api/v1/auth/user/${userId}`)
//       .set('Authorization', `${adminToken}`)
//     expect(statusCode).toBe(200)
//     expect(body.data.user.username).toBe(userPayload.username)
//     expect(body.data.user.email).toBe(userPayload.email)
//   })

//   it('should return not found 404', async () => {
//     const userId = 123
//     await supertest(app)
//       .get(`/api/v1/auth/user/${userId}`)
//       .set('Authorization', `${adminToken}`)
//       .expect(404)
//   })
// })

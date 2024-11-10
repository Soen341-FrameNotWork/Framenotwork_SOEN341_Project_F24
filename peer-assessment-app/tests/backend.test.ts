// Import necessary libraries and modules
import request from 'supertest';
import { createServer } from 'http';
import { parse } from 'url';
import { POST as registerHandler } from '../../app/api/register/route'; // Adjust path if needed
import mysql from 'mysql2/promise';
import { hash } from 'bcrypt';

// Mock MySQL and bcrypt for testing registration
jest.mock('mysql2/promise', () => ({
    createConnection: jest.fn().mockReturnValue({
        execute: jest.fn(),
    }),
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedpassword123'),
}));

// Helper function to create a test server for the handler
const createTestServer = (handler) => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handler(req, res, parsedUrl);
    });
    return request(server);
};

describe('Registration API Tests', () => {
    const request = createTestServer(registerHandler);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user successfully', async () => {
        mysql.createConnection().execute
            .mockResolvedValueOnce([[]]) // No existing user found
            .mockResolvedValueOnce([{ insertId: 1 }]); // New user inserted

        const response = await request
            .post('/api/register')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane.doe@example.com',
                password: 'securepassword123',
                userType: 'student',
            })
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toEqual({ message: 'User registered successfully' });
    });

    it('should return 400 for missing fields', async () => {
        const response = await request
            .post('/api/register')
            .send({
                firstName: 'Jane',
                email: 'jane.doe@example.com',
                password: 'securepassword123',
                userType: 'student',
            })
            .expect(400);

        expect(response.body).toEqual({ error: 'Missing required fields' });
    });

    it('should return 400 for duplicate user', async () => {
        mysql.createConnection().execute
            .mockResolvedValueOnce([[{ id: 1 }]]); // User already exists

        const response = await request
            .post('/api/register')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane.doe@example.com',
                password: 'securepassword123',
                userType: 'student',
            })
            .expect(400);

        expect(response.body).toEqual({ error: 'User already exists' });
    });

    it('should return 400 for invalid user type', async () => {
        const response = await request
            .post('/api/register')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane.doe@example.com',
                password: 'securepassword123',
                userType: 'admin', // Invalid user type
            })
            .expect(400);

        expect(response.body).toEqual({ error: 'Invalid user type' });
    });

    it('should return 500 for internal server error', async () => {
        mysql.createConnection().execute.mockRejectedValueOnce(new Error('Database error'));

        const response = await request
            .post('/api/register')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane.doe@example.com',
                password: 'securepassword123',
                userType: 'student',
            })
            .expect(500);

        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});


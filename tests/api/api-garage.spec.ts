import { test, expect, APIRequestContext } from '@playwright/test';

test.describe('Garage API', () => {

    async function clearGarage(request: APIRequestContext) {
        const response = await request.get('/api/cars');
        expect(response.status()).toBe(200);
        const body = await response.json();

        for (const car of body.data) {
            const deleteResponse = await request.delete(`/api/cars/${car.id}`);
            expect(deleteResponse.status()).toBe(200);
        }
    }

    test('The garage doesn`t have any cars', async ({ request }) => {
        await clearGarage(request);

        const response = await request.get('/api/cars');
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data).toHaveLength(0);
    });

    test.describe('POST /api/cars', () => {

        test('The car was added successfully', async ({ request }) => {
            const response = await request.post('/api/cars', {
                data: {
                    carBrandId: 1,
                    carModelId: 1,
                    mileage: 100
                }
            });

            expect(response.status()).toBe(201);
            const body = await response.json();
            expect(body.status).toBe('ok');
            expect(body.data.brand).toBe('Audi');
            expect(body.data.model).toBe('TT');
            expect(body.data.mileage).toBe(100);
            expect(body.data.id).toBeDefined();
        });

        test('Car should not be created without carBrandId', async ({ request }) => {
            const response = await request.post('/api/cars', {
                data: {
                    carModelId: 1,
                    mileage: 100
                }
            });

            expect(response.status()).toBe(400);
            const body = await response.json();
            expect(body.status).toBe('error');
        });

        test('Car should not be created with negative mileage', async ({ request }) => {
            const response = await request.post('/api/cars', {
                data: {
                    carBrandId: 1,
                    carModelId: 1,
                    mileage: -100
                }
            });

            expect(response.status()).toBe(400);
            const body = await response.json();
            expect(body.status).toBe('error');
        });

        test('Porsche Panamera was added successfully', async ({ request }) => {
            const response = await request.post('/api/cars', {
                data: {
                    carBrandId: 4,
                    carModelId: 18,
                    mileage: 150
                }
            });

            expect(response.status()).toBe(201);
            const body = await response.json();
            expect(body.data.brand).toBe('Porsche');
            expect(body.data.model).toBe('Panamera');
            expect(body.data.mileage).toBe(150);
        });
    });

    test('Remove added car', async ({ request }) => {
        const createResponse = await request.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 100
            }
        });

        expect(createResponse.status()).toBe(201);
        const createdCar = await createResponse.json();
        const carId = createdCar.data.id;
        const deleteResponse = await request.delete(`/api/cars/${carId}`);
        expect(deleteResponse.status()).toBe(200);
    });

    test('Update mileage for Porsche Panamera', async ({ request }) => {
        const createResponse = await request.post('/api/cars', {
            data: {
                carBrandId: 4,
                carModelId: 18,
                mileage: 150
            }
        });

        expect(createResponse.status()).toBe(201);
        const createdCar = await createResponse.json();
        const carId = createdCar.data.id;
        const updateResponse = await request.put(`/api/cars/${carId}`, {
            data: {
                carBrandId: 4,
                carModelId: 18,
                carCreatedAt: createdCar.data.carCreatedAt,
                mileage: 151
            }
        });

        expect(updateResponse.status()).toBe(200);
        const updatedCar = await updateResponse.json();
        expect(updatedCar.data.mileage).toBe(151);
    });

    test.afterAll(async ({ request }) => {
        await clearGarage(request);
    });

});
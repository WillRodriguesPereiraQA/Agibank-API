import { test, expect } from '@playwright/test';

const BASE = process.env.DOGS_API_BASE || 'http://localhost:3000';

test.describe.serial('Dogs API - CRUD tests', () => {
  let createdId: string | number;

  test('CT-01 Create new dog (POST /dogs) - should return 201 and created resource', async ({ request }) => {
    const payload = { name: 'Rex', age: 4, breed: 'Labrador', weight: 20.5 };
    const res = await request.post(`${BASE}/dogs`, { data: payload });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(body.name).toBe(payload.name);
    expect(body.age).toBe(payload.age);
    expect(body.breed).toBe(payload.breed);
    expect(body.weight).toBe(payload.weight);
    createdId = body.id;
  });

  test('CT-03 List all dogs (GET /dogs) - should return 200 and array', async ({ request }) => {
    const res = await request.get(`${BASE}/dogs`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('CT-04 Get dog by id (GET /dogs/{id}) - should return 200 and the dog object', async ({ request }) => {
    const res = await request.get(`${BASE}/dogs/${createdId}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(body.id).toBe(createdId);
  });

  test('CT-06 Update dog (PUT /dogs/{id}) - should return 200 and updated object', async ({ request }) => {
    const update = { name: 'Rex Jr', age: 5, breed: 'Labrador', weight: 21 };
    const res = await request.put(`${BASE}/dogs/${createdId}`, { data: update });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(createdId);
    expect(body.name).toBe(update.name);
    expect(body.age).toBe(update.age);
  });

  test('CT-08 Delete dog (DELETE /dogs/{id}) - should return 204 and remove resource', async ({ request }) => {
    const res = await request.delete(`${BASE}/dogs/${createdId}`);
    expect(res.status()).toBe(204);
  });

  test('CT-05 Get deleted dog should return 404', async ({ request }) => {
    const res = await request.get(`${BASE}/dogs/${createdId}`);
    expect(res.status()).toBe(404);
    const body = await res.json().catch(() => null);
    if (body) expect(body).toHaveProperty('error');
  });
});

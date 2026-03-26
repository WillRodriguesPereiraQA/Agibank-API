import { test, expect, request } from '@playwright/test';

const BASE = 'https://dog.ceo/api';

test.describe('Dog API - Playwright API tests', () => {
  test('GET /breeds/list/all returns object of breeds', async ({ request }) => {
    const res = await request.get(`${BASE}/breeds/list/all`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('message');
    expect(typeof body.message).toBe('object');
    expect(body).toHaveProperty('status', 'success');
  });

  test('GET /breed/{breed}/images returns array of images', async ({ request }) => {
    const breed = 'hound';
    const res = await request.get(`${BASE}/breed/${breed}/images`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.message)).toBe(true);
    expect(body).toHaveProperty('status', 'success');
  });

  test('GET /breed/{breed}/images/random returns single url', async ({ request }) => {
    const breed = 'hound';
    const res = await request.get(`${BASE}/breed/${breed}/images/random`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(typeof body.message).toBe('string');
  });

  test('GET random 3 images returns array of length 3', async ({ request }) => {
    const res = await request.get(`${BASE}/breeds/image/random/3`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.message)).toBe(true);
    expect(body.message.length).toBe(3);
  });

  test('GET invalid breed returns error', async ({ request }) => {
    const breed = 'not-a-breed';
    const res = await request.get(`${BASE}/breed/${breed}/images`);
    // Dog API returns 404 with JSON status 'error' in body sometimes
    expect([200, 404]).toContain(res.status());
    const body = await res.json();
    expect(body).toHaveProperty('status');
  });
});

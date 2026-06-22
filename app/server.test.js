const { describe, it } = require('node:test');
const assert = require('node:assert');
const { fork } = require('node:child_process');
const path = require('node:path');

const serverPath = path.join(__dirname, 'server.js');

describe('demo-app server', () => {
  it('should return 200 with msg and ts fields', async () => {
    const child = fork(serverPath, {
      env: { ...process.env, PORT: '3099' },
      silent: true
    });

    try {
      await new Promise(r => setTimeout(r, 300));
      const res = await fetch('http://localhost:3099');
      assert.strictEqual(res.status, 404);
      const body = await res.json();
      assert.ok(body.msg);
      assert.ok(typeof body.ts === 'number');
    } finally {
      child.kill();
    }
  });

  it('should include NAME env when set', async () => {
    const child = fork(serverPath, {
      env: { ...process.env, PORT: '3098', NAME: 'phase1' },
      silent: true
    });

    try {
      await new Promise(r => setTimeout(r, 300));
      const res = await fetch('http://localhost:3098');
      const body = await res.json();
      assert.ok(body.msg.includes('phase1'));
    } finally {
      child.kill();
    }
  });

  it('should default to "docker" when NAME is not set', async () => {
    const { NAME, ...cleanEnv } = process.env;
    const child = fork(serverPath, {
      env: { ...cleanEnv, PORT: '3097' },
      silent: true
    });

    try {
      await new Promise(r => setTimeout(r, 300));
      const res = await fetch('http://localhost:3097');
      const body = await res.json();
      assert.ok(body.msg.includes('docker'));
    } finally {
      child.kill();
    }
  });
});
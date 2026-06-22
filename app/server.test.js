const { describe, it } = require('node:test');
const assert = require('node:assert');
const { fork } = require('node:child_process');
const path = require('node:path');

const serverPath = path.join(__dirname, 'server.js');

describe('demo-app server', () => {
  it('should return 200 with msg and ts fields', async () => {
    // fork = tạo 1 process Node con chạy server.js riêng
    const child = fork(serverPath, {
      env: { ...process.env, PORT: '3099' },  // truyền PORT=3099
      silent: true                             // tắt log ra màn hình
    });

    // Đợi 300ms cho server kịp start
    await new Promise(r => setTimeout(r, 300));

    // Gọi fetch() tới server vừa tạo
    const res = await fetch('http://localhost:3099');
    assert.strictEqual(res.status, 200);       // phải trả về 200

    const body = await res.json();
    assert.ok(body.msg);                       // phải có field msg
    assert.ok(typeof body.ts === 'number');    // ts phải là số

    child.kill();                              // tắt process sau khi test xong
  });

  it('should include NAME env when set', async () => {
    const child = fork(serverPath, {
      env: { ...process.env, PORT: '3098', NAME: 'phase1' },
      silent: true
    });

    await new Promise(r => setTimeout(r, 300));

    const res = await fetch('http://localhost:3098');
    const body = await res.json();
    assert.ok(body.msg.includes('phase1'));    // msg phải chứa "phase1"

    child.kill();
  });

  it('should default to "docker" when NAME is not set', async () => {
    // Xóa NAME khỏi env để test fallback
    const { NAME, ...cleanEnv } = process.env;
    const child = fork(serverPath, {
      env: { ...cleanEnv, PORT: '3097' },
      silent: true
    });

    await new Promise(r => setTimeout(r, 300));

    const res = await fetch('http://localhost:3097');
    const body = await res.json();
    assert.ok(body.msg.includes('docker'));

    child.kill();
  });
});
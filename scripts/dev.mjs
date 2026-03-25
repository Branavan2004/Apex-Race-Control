import { spawn } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');

const api = spawn(process.execPath, ['server/api-server.mjs'], {
  cwd: root,
  stdio: 'inherit',
});

const web = spawn(process.execPath, [viteBin, '--host', '0.0.0.0'], {
  cwd: root,
  stdio: 'inherit',
});

function stopAll(exitCode = 0) {
  api.kill('SIGTERM');
  web.kill('SIGTERM');
  process.exit(exitCode);
}

process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));

api.on('exit', (code) => {
  if (code && code !== 0) {
    web.kill('SIGTERM');
    process.exit(code);
  }
});

web.on('exit', (code) => {
  if (code && code !== 0) {
    api.kill('SIGTERM');
    process.exit(code);
  }
});

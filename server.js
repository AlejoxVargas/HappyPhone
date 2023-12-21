const { exec } = require('child_process');
const path = require('path');

// Comando para iniciar json-server
const jsonServerCommand = `json-server --quiet json/db.json`;

// Comando para iniciar tu aplicación (ajusta según sea necesario)
const appCommand = `node src/index.js`;

// Ejecuta json-server en un proceso separado
const jsonServerProcess = exec(jsonServerCommand, { cwd: path.join(__dirname) });

// Captura y muestra los errores de json-server
jsonServerProcess.stderr.on('data', (data) => {
  console.error(`Error en json-server: ${data}`);
});

// Muestra la salida de json-server en la consola
jsonServerProcess.stdout.on('data', (data) => {
  console.log(`json-server: ${data}`);
});

// Ejecuta tu aplicación después de que json-server haya iniciado
jsonServerProcess.on('exit', () => {
  console.log('json-server ha terminado. Iniciando la aplicación...');
  exec(appCommand, { cwd: path.join(__dirname) });
});

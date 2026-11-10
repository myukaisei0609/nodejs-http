
'use strict';

const http = require('node:http');
const pug = require('pug');

const server = http
  .createServer((req, res) => {
    const now = new Date();
    console.info(
      `[${now}] 次のIPアドレスからアクセスがあったよ ${req.socket.remoteAddress}`
    );

    switch (req.method) {
      case 'GET':
        if (req.url === '/') {
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
          });
          res.write(pug.renderFile('./top.pug'));

        } else if (req.url === '/enquetes') {
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
          });
          res.write(pug.renderFile('./enquetes.pug'));

        } else if (req.url === '/enquetes/yaki-tofu') {
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
          });
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: '焼き肉',
              secondItem: '湯豆腐'
            })
          );

        } else if (req.url === '/enquetes/rice-bread') {
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
          });
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: 'ごはん',
              secondItem: 'パン'
            })
          );

        } else if (req.url === '/enquetes/sushi-pizza') {
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
          });
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: '寿司',
              secondItem: 'ピザ'
            })
          );

        } else {
          res.writeHead(404);
          res.write('Not Found');
        }

        res.end();
        break;

      case 'POST':
        let rawData = '';

        req
          .on('data', chunk => {
            rawData += chunk;
          })
          .on('end', () => {
            const answer = new URLSearchParams(rawData);
            const body = `${answer.get('name')}さんは${answer.get('favorite')}に投票しました`;

            console.info(`[${now}] ${body}`);

            res.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8'
            });

            res.write(
              `<!DOCTYPE html><html lang="ja"><body><h1>${body}</h1></body></html>`
            );
            res.end();
          });
        break;

      default:
        res.writeHead(405);
        res.end('Method Not Allowed');
    }
  })
  .on('error', e => {
    console.error(`[${new Date()}] Server Error`, e);
  })
  .on('clientError', e => {
    console.error(`[${new Date()}] Client Error`, e);
  });

const port = 8000;

server.listen(port, () => {
  console.info(`[${new Date()}] Listening on ${port}`);
});

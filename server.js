// Railway용 정적 파일 서버 (외부 패키지 없이 Node 기본 기능만 사용)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
};

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    const filePath = path.normalize(path.join(ROOT, urlPath));

    // 저장소 폴더 밖이나 서버 파일 자체는 보여주지 않음
    if (!filePath.startsWith(ROOT + path.sep) || /server\.js$|package\.json$|\/\.git/.test(filePath)) {
      res.writeHead(404).end('Not found');
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('페이지를 찾을 수 없습니다.');
        return;
      }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(filePath)] || 'application/octet-stream' });
      res.end(data);
    });
  })
  .listen(PORT, '0.0.0.0', () => console.log(`유경스터디까페 서버 실행 중: 포트 ${PORT}`));

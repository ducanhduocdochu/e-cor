const app = require('./src/app');

const PORT = process.env.DEV_APP_PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Kết nối với server thành công tại port ${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => console.log('Exit Server Express'));
});

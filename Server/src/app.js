const express = require('express')
const helmet =  require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const dotenv = require('dotenv')

const app = express();
dotenv.config();

// Khởi tạo middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Khởi tạo passport
require('./passport')

// Khởi tạo db
require('./dbs/init.database'); // Không cần gán cho biến nếu chỉ muốn chạy init.database

// Khởi tạo route chính
app.use('', require('./routers'));

// Xử lý lỗi sai API endpoint
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Xử lý lỗi cú pháp và lỗi server
app.use((error, req, res, next) => {
    const status = error.status || 500;
    return res.status(status).json({
        status: 'error',
        code: status,
        stack: error.stack,
        message: error.message || 'Internal Server Error',
    });
});

module.exports = app;

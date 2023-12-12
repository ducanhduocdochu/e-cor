# Sử dụng một hình ảnh có sẵn với Node.js và npm
FROM node:14

# Tạo thư mục ứng dụng trong hình ảnh
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào hình ảnh
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép mã nguồn ứng dụng vào hình ảnh
COPY . .

# Mở cổng mà ứng dụng chạy trên
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["npm", "start"]

# Sử dụng Node.js làm base image
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Biên dịch dự án NestJS (nếu đang sử dụng TypeScript)
RUN npm run build

# Cấp quyền truy cập cổng cho ứng dụng (theo cổng bạn đã cấu hình trong app)
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["npm", "start"]

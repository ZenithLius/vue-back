FROM node
LABEL name='vue-back'
LABEL version="1.0"
# 设置工作目录(关键!)
WORKDIR /app
# 先复制 package 文件
COPY package*.json ./
# 清理 npm 缓存并安装依赖
RUN npm cache clean --force && npm install
# 复制其他文件
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

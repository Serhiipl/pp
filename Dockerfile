# Stage 1: Base layer с установкой всех зависимостей
FROM node:22-alpine AS base

WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

# Устанавливаем только production dependencies
RUN npm install --omit=dev

# Копируем весь код (включая папку prisma)
COPY . .

# Собираем проект
RUN npm run build

# Stage 2: Минимизируем финальный образ
FROM node:22-alpine AS release

WORKDIR /app

# Копируем только production зависимости и собранный код
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next

# Убедитесь, что prisma доступна в финальном контейнере
COPY --from=base /app/prisma /app/prisma

# Expose port for the app
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
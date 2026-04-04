FROM oven/bun:1.3-alpine

WORKDIR /app

LABEL org.opencontainers.image.title="mysql-mcp"
LABEL org.opencontainers.image.description="Minimal read-only MySQL MCP server"
LABEL org.opencontainers.image.licenses="MIT"

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY src ./src

ENV NODE_ENV=production

CMD ["bun", "run", "src/index.ts"]

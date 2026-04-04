#!/usr/bin/env bun

import { McpServer, StdioServerTransport } from "@modelcontextprotocol/server";
import mysql from "mysql2/promise";
import { z } from "zod";

const url = process.env.MYSQL_URL;
if (!url) throw new Error("MYSQL_URL is required");

const connection = await mysql.createConnection(url);

const server = new McpServer({ name: "mysql-mcp", version: "0.1.0" });

function ensureReadOnly(sql: string) {
  const trimmed = sql.trim();

  if (!/^(SELECT|SHOW|DESCRIBE|EXPLAIN|WITH)\b/i.test(trimmed)) {
    throw new Error("Only read-only queries are allowed");
  }

  if (/[;]\s*\S/.test(trimmed)) {
    throw new Error("Only a single statement is allowed");
  }
}

server.registerTool(
  "mysql_query",
  {
    description: "Run a read-only MySQL query.",
    inputSchema: z.object({ sql: z.string() }),
  },
  async ({ sql }) => {
    ensureReadOnly(sql);

    const [rows] = await connection.query(sql);

    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
    };
  },
);

await server.connect(new StdioServerTransport());

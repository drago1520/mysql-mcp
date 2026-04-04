# mysql-mcp

Minimal read-only MySQL MCP server.

This repository is the simplest and fastest way to connect MySQL to your AI agent:

1. Provide a `MYSQL_URL` connection string (with or without a specific database).
2. Run one command to add it to your agent.

It exposes one tool:

- `mysql_query`

Allowed queries start with `SELECT`, `SHOW`, `DESCRIBE`, `EXPLAIN`, or `WITH`.

## Install in Codex

Add this MCP server to your agent in one command:

If MySQL runs on your machine:

```bash
codex mcp add mysql -- docker run --rm -i -e MYSQL_URL=mysql://USER:PASSWORD@HOST:PORT ghcr.io/drago1520/mysql-mcp:latest
```

If MySQL runs on Docker (default host network):

```bash
codex mcp add mysql -- docker run --rm -i -e MYSQL_URL=mysql://USER:PASSWORD@host.docker.internal:PORT ghcr.io/drago1520/mysql-mcp:latest
```

## MYSQL_URL

`MYSQL_URL` is used exactly as provided, so you can connect either:

Without a database name:

```bash
mysql://USER:PASSWORD@HOST:3306
```

there is no default schema, so query fully qualified tables like
`my_db.users`.

With a database name:

```bash
mysql://USER:PASSWORD@HOST:3306/my_db
```
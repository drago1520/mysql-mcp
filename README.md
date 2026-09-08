# mysql-mcp

Minimal read-only MySQL MCP server.

This repository is the simplest and fastest way to connect MySQL to your AI agent:

**Everything is local and private**: your agent talks to this MCP server on your machine.

1. Provide a `MYSQL_URL` connection string (with or without a specific database).
2. Run one command to add it to your agent.

It exposes one tool:

- `mysql_query`

Allowed queries start with `SELECT`, `SHOW`, `DESCRIBE`, `EXPLAIN`, or `WITH`.

## Get started

### 1) Pick your MySQL host

If MySQL runs on your machine:

```bash
MYSQL_URL=mysql://USER:PASSWORD@HOST:PORT
```

If MySQL runs in Docker (default host network from your MCP container):

```bash
MYSQL_URL=mysql://USER:PASSWORD@host.docker.internal:PORT
```

### 2) Add it to your agent

Replace `HOST` with `host.docker.internal` if your MySQL runs in Docker.

<details>
<summary>GitHub Copilot Connect (VS Code)</summary>

`.vscode/mcp.json`

```json
{
  "servers": {
    "mysql": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e",
        "MYSQL_URL=mysql://USER:PASSWORD@HOST:PORT",
        "ghcr.io/drago1520/mysql-mcp:latest"
      ]
    }
  }
}
```

</details>

<details>
<summary>Codex</summary>

```bash
codex mcp add mysql -- docker run --rm -i -e MYSQL_URL=mysql://USER:PASSWORD@HOST:PORT ghcr.io/drago1520/mysql-mcp:latest
```

</details>

<details>
<summary>Claude Code</summary>

```bash
claude mcp add NAME --transport stdio \
  --env "MYSQL_URL=mysql://USER:PASS@HOST:PORT" \
  -- docker run --rm -i \
  -e "MYSQL_URL=mysql://USER:PASS@HOST:PORT" \
  ghcr.io/drago1520/mysql-mcp:latest
```
with Infisical for env injection:
```bash
claude mcp add MCP-NAME --transport stdio -- \
  infisical.exe run --projectId PROJECT_ID --domain DOMAIN_IF_SELF_HOST --path PATH --env=prod -- \
  docker run --rm -i -e MYSQL_URL ghcr.io/drago1520/mysql-mcp:latest
```
*will fail once `infisical login` expires.

</details>

<details>
<summary>Google AI (Gemini CLI)</summary>

`~/.gemini/settings.json`

```json
{
  "mcpServers": {
    "mysql": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e",
        "MYSQL_URL=mysql://USER:PASSWORD@HOST:PORT",
        "ghcr.io/drago1520/mysql-mcp:latest"
      ]
    }
  }
}
```

</details>

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

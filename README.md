# mysql-mcp

Minimal read-only MySQL MCP server.

It exposes one tool:

- `mysql_query`

Allowed queries start with `SELECT`, `SHOW`, `DESCRIBE`, `EXPLAIN`, or `WITH`.

## Install in Codex

If MySQL runs on your machine:

```bash
codex mcp add mysql -- docker run --rm -i -e MYSQL_URL=mysql://USER:PASSWORD@HOST:PORT ghcr.io/drago1520/mysql-mcp:latest
```

If MySQL runs on Docker (default host network):

```bash
codex mcp add mysql -- docker run --rm -i -e MYSQL_URL=mysql://USER:PASSWORD@host.docker.internal:PORT ghcr.io/drago1520/mysql-mcp:latest
```

## MYSQL_URL

`MYSQL_URL` is used exactly as provided.

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

## Publish

This repo already includes
[`publish-ghcr.yml`](.github/workflows/publish-ghcr.yml).

When you push to `main`, GitHub Actions publishes:

```bash
ghcr.io/drago1520/mysql-mcp:latest
```

and also a branch tag:

```bash
ghcr.io/drago1520/mysql-mcp:main
```

To make the image publicly pullable by everyone:

1. Push this repository to GitHub.
2. Let the `Publish GHCR Image` workflow run once on `main`.
3. Open GitHub `Packages` for this repository owner.
4. Open the `mysql-mcp` package.
5. Change package visibility to `Public`.

Then anyone can pull it with:

```bash
docker pull ghcr.io/drago1520/mysql-mcp:latest
```

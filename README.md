# Lily Reply

Non-streaming Spanish tutor replies via [OpenRouter](https://openrouter.ai), exposed at `app/api/lily-reply/route.ts`.

## Environment variables

Create `.env.local` at the repo root (gitignored — never commit). All three are required:

| Variable | Description |
| --- | --- |
| `OPENROUTER_API_KEY` | API key from [openrouter.ai/keys](https://openrouter.ai/keys) |
| `OPENROUTER_MODEL` | Free-tier model id, e.g. `liquid/lfm-2.5-1.2b-instruct:free` |
| `OPENROUTER_BASE_URL` | `https://openrouter.ai/api/v1` |

```bash
OPENROUTER_API_KEY=your-key-here
OPENROUTER_MODEL=liquid/lfm-2.5-1.2b-instruct:free
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

OpenRouter rotates free models; if you get a 404, pick a current `:free` model from [openrouter.ai/models](https://openrouter.ai/models).

## Run locally

```bash
npm install
npm run dev
```

## Test the route

```bash
curl -X POST http://localhost:3000/api/lily-reply \
  -H "Content-Type: application/json" \
  -d '{"message":"Hola"}'
```

Expected response:

```json
{ "reply": "..." }
```

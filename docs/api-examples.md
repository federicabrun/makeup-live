# Makeup Live API Examples

## Register

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Luna","email":"luna@example.com","password":"password123","skin_type":"mixed"}'
```

## Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"luna@example.com","password":"password123"}'
```

## Add favorite

```bash
curl -X POST http://localhost:4000/api/favorites \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"entity_type":"product","entity_id":1}'
```

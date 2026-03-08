/**
 * Energy Cost Compare — API Server
 * 전기 생산 비용 비교 API 서버
 * ⚠️ 공익적 목적으로만 사용 / PUBLIC INTEREST USE ONLY
 */
const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const morgan    = require('morgan');
const rateLimit = require('express-rate-limit');
const { SOURCES, CATEGORIES, getSortedByLCOE, getSortedByCO2, getStats } = require('./data/energy');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use((req, res, next) => {
  res.setHeader('X-Purpose', 'Public-Interest-Only');
  next();
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', sources: SOURCES.length }));
app.get('/api/sources', (req, res) => {
  const { category, sort } = req.query;
  let data = sort === 'co2' ? getSortedByCO2() : getSortedByLCOE();
  if (category && category !== 'all') data = data.filter(s => s.category === category);
  res.json({ data, count: data.length });
});
app.get('/api/sources/:id', (req, res) => {
  const src = SOURCES.find(s => s.id === req.params.id);
  if (!src) return res.status(404).json({ error: 'Not found' });
  res.json({ data: src });
});
app.get('/api/ranking/lcoe', (req, res) => res.json({ data: getSortedByLCOE() }));
app.get('/api/ranking/co2',  (req, res) => res.json({ data: getSortedByCO2() }));
app.get('/api/stats',        (req, res) => res.json({ data: getStats() }));
app.get('/api/categories',   (req, res) => res.json({ data: CATEGORIES }));

app.listen(PORT, () => console.log(`\n⚡  Energy Compare API → http://localhost:${PORT}\n`));
module.exports = app;

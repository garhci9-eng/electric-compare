import React, { useState, useEffect } from 'react'
import { fetchSources, fetchStats, fetchCategories, fetchRankingCO2, healthCheck } from './utils/api'
import SourceCard from './components/SourceCard'
import './styles/global.css'
import styles from './styles/App.module.css'

const SORT_OPTIONS = [
  { value: 'lcoe', label: '비용 낮은순 / Lowest Cost', icon: '₩' },
  { value: 'co2',  label: '탄소 낮은순 / Lowest CO₂',  icon: '🌿' },
]

export default function App() {
  const [sources, setSources]   = useState([])
  const [stats, setStats]       = useState(null)
  const [categories, setCats]   = useState([])
  const [co2Ranking, setCO2]    = useState([])
  const [category, setCategory] = useState('all')
  const [sort, setSort]         = useState('lcoe')
  const [apiOk, setApiOk]       = useState(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    healthCheck().then(() => setApiOk(true)).catch(() => setApiOk(false))
    Promise.all([
      fetchStats(),
      fetchCategories(),
      fetchRankingCO2(),
    ]).then(([s, c, co2]) => {
      setStats(s.data.data)
      setCats(c.data.data)
      setCO2(co2.data.data)
    }).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchSources({ category, sort }).then(r => setSources(r.data.data))
  }, [category, sort])

  const getCO2Color = (v) => v < 50 ? '#22c55e' : v < 200 ? '#eab308' : v < 500 ? '#f97316' : '#ef4444'

  return (
    <div className={styles.app}>

      {/* ── HEADER ── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoGlyph}>⚡</span>
            <div>
              <div className={styles.logoText}>전기 생산 비용 비교</div>
              <div className={styles.logoSub}>Electricity Generation Cost Compare · v1.0</div>
            </div>
          </div>
          <div className={styles.apiStatus}>
            <span className={styles.apiDot} style={{
              background: apiOk === null ? '#3d5068' : apiOk ? '#22c55e' : '#ef4444',
              boxShadow: apiOk ? '0 0 6px #22c55e' : 'none',
            }} />
            <span className={styles.apiLabel}>{apiOk ? 'Live' : apiOk === false ? 'Offline' : '...'}</span>
          </div>
        </div>
      </header>

      {/* ── DISCLAIMER ── */}
      <div className={styles.disclaimer}>
        ⚠️ &nbsp;<strong>공익적 목적으로만 사용 / PUBLIC INTEREST USE ONLY</strong>
        &nbsp;— 데이터 출처: IEA · IRENA · Lazard 2024 &nbsp;·&nbsp; 아이디어 90% 창작자 · 구현 10% Claude
      </div>

      {/* ── HERO ── */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLabel}>LCOE · 균등화 발전비용 기준</div>
          <h1 className={styles.heroTitle}>전기, 어떻게<br /><em>만드는 게</em> 가장 싸나</h1>
          <p className={styles.heroDesc}>
            태양광부터 석탄까지 — 10가지 발전원의 비용·탄소·효율을 한눈에.<br />
            <span className={styles.heroDescEn}>From solar to coal — cost, carbon & efficiency of 10 power sources at a glance.</span>
          </p>
          {stats && (
            <div className={styles.heroStats}>
              <div className={styles.hStat}>
                <div className={styles.hStatVal} style={{ color: '#22c55e' }}>${stats.cheapest?.lcoe.avg}</div>
                <div className={styles.hStatLabel}>최저 / Cheapest<br />{stats.cheapest?.nameKr}</div>
              </div>
              <div className={styles.hStatDivider} />
              <div className={styles.hStat}>
                <div className={styles.hStatVal} style={{ color: '#ef4444' }}>${stats.mostExpensive?.lcoe.avg}</div>
                <div className={styles.hStatLabel}>최고 / Most Expensive<br />{stats.mostExpensive?.nameKr}</div>
              </div>
              <div className={styles.hStatDivider} />
              <div className={styles.hStat}>
                <div className={styles.hStatVal} style={{ color: '#22c55e' }}>{stats.cleanest?.co2}g</div>
                <div className={styles.hStatLabel}>최저 탄소 / Lowest CO₂<br />{stats.cleanest?.nameKr}</div>
              </div>
              <div className={styles.hStatDivider} />
              <div className={styles.hStat}>
                <div className={styles.hStatVal} style={{ color: '#06b6d4' }}>{stats.mostReliable?.capacityFactor}%</div>
                <div className={styles.hStatLabel}>최고 용량계수<br />{stats.mostReliable?.nameKr}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className={styles.body}>
        <aside className={styles.sidebar}>
          {/* CO2 mini ranking */}
          <div className={styles.sideCard}>
            <div className="section-label">탄소 순위 / CO₂ Rank</div>
            {co2Ranking.slice(0, 6).map((s, i) => (
              <div key={s.id} className={styles.co2Row}>
                <span className={styles.co2Rank}>#{i+1}</span>
                <span className={styles.co2Icon}>{s.icon}</span>
                <span className={styles.co2Name}>{s.nameKr}</span>
                <span className={styles.co2Num} style={{ color: getCO2Color(s.co2) }}>{s.co2}g</span>
              </div>
            ))}
          </div>

          {/* Data note */}
          <div className={styles.sideNote}>
            <div className={styles.sideNoteTitle}>📊 데이터 출처 / Sources</div>
            <div className={styles.sideNoteBody}>
              IEA World Energy Outlook 2024<br />
              IRENA Renewable Power Generation Costs 2023<br />
              Lazard LCOE Analysis v17.0<br /><br />
              <em>모든 수치는 국제 평균 참조 값입니다.<br />All figures are international reference averages.</em>
            </div>
          </div>

          {/* Contribution */}
          <div className={styles.sideCard}>
            <div className="section-label">기여 / Contribution</div>
            <div className={styles.contribRow}>
              <span>아이디어</span>
              <div className={styles.cBar}><div style={{ width: '90%', background: '#eab308' }} /></div>
              <span style={{ color: '#eab308', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>90%</span>
            </div>
            <div className={styles.contribRow}>
              <span>Claude</span>
              <div className={styles.cBar}><div style={{ width: '10%', background: 'var(--text3)' }} /></div>
              <span style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>10%</span>
            </div>
          </div>
        </aside>

        <main className={styles.main}>
          {/* Controls */}
          <div className={styles.controls}>
            <div className={styles.catBtns}>
              {categories.map(c => (
                <button key={c.id}
                  className={`${styles.catBtn} ${category === c.id ? styles.catActive : ''}`}
                  onClick={() => setCategory(c.id)}>
                  {c.label} / {c.labelEn}
                </button>
              ))}
            </div>
            <div className={styles.sortBtns}>
              {SORT_OPTIONS.map(s => (
                <button key={s.value}
                  className={`${styles.sortBtn} ${sort === s.value ? styles.sortActive : ''}`}
                  onClick={() => setSort(s.value)}>
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className={styles.legend}>
            <span className={styles.legendItem}><span style={{ color: '#22c55e' }}>■</span> 저비용·저탄소 / Low cost & low carbon</span>
            <span className={styles.legendItem}><span style={{ color: '#eab308' }}>■</span> 중간 / Medium</span>
            <span className={styles.legendItem}><span style={{ color: '#ef4444' }}>■</span> 고비용·고탄소 / High cost or high carbon</span>
            <span className={styles.legendItem} style={{ color: 'var(--text3)' }}>LCOE = 균등화 발전비용 (USD/MWh)</span>
          </div>

          {/* Cards */}
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <span>로딩 중 / Loading...</span>
            </div>
          ) : (
            <div className={`${styles.grid} stagger`}>
              {sources.map((src, i) => (
                <SourceCard key={src.id} src={src} rank={i + 1} />
              ))}
            </div>
          )}
        </main>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>전기 생산 비용 비교 / Electricity Generation Cost Compare</span>
          <span>아이디어 90% 창작자 · 구현 10% Claude (Anthropic)</span>
          <span>⚠️ 공익적 목적으로만 사용 / Public Interest Use Only</span>
        </div>
      </footer>
    </div>
  )
}

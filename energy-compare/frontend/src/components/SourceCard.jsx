import React, { useState } from 'react'
import styles from './SourceCard.module.css'

function CO2Bar({ value }) {
  const max = 820
  const pct = Math.min((value / max) * 100, 100)
  const color = value < 50 ? '#22c55e' : value < 200 ? '#eab308' : value < 500 ? '#f97316' : '#ef4444'
  return (
    <div className={styles.co2Wrap}>
      <div className={styles.co2Track}>
        <div className={styles.co2Fill} style={{ '--w': `${pct}%`, background: color }} />
      </div>
      <span className={styles.co2Val} style={{ color }}>{value} gCO₂/kWh</span>
    </div>
  )
}

export default function SourceCard({ src, rank }) {
  const [open, setOpen] = useState(false)
  const lcoeColor = src.lcoe.avg < 50 ? '#22c55e' : src.lcoe.avg < 80 ? '#eab308' : src.lcoe.avg < 120 ? '#f97316' : '#ef4444'

  return (
    <div className={`${styles.card} ${open ? styles.cardOpen : ''}`}
      style={{ '--accent': src.color, '--accent-light': src.colorLight }}>

      {/* Rank + header */}
      <div className={styles.header}>
        <div className={styles.rankBadge}>#{rank}</div>
        <div className={styles.iconWrap} style={{ background: src.colorLight }}>
          <span className={styles.icon}>{src.icon}</span>
        </div>
        <div className={styles.titleWrap}>
          <div className={styles.name}>{src.nameKr}</div>
          <div className={styles.nameEn}>{src.name}</div>
          <span className={`tag ${src.category === 'renewable' ? 'tag-green' : src.category === 'low_carbon' ? 'tag-cyan' : 'tag-red'}`}>
            {src.categoryKr} / {src.category === 'renewable' ? 'Renewable' : src.category === 'low_carbon' ? 'Low Carbon' : 'Fossil'}
          </span>
        </div>
        <div className={styles.lcoeWrap}>
          <div className={styles.lcoeVal} style={{ color: lcoeColor }}>${src.lcoe.avg}</div>
          <div className={styles.lcoeUnit}>USD/MWh</div>
          <div className={styles.lcoeRange}>${src.lcoe.min}–${src.lcoe.max}</div>
        </div>
      </div>

      {/* CO2 bar */}
      <CO2Bar value={src.co2} />

      {/* Quick stats */}
      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <div className={styles.statLabel}>용량계수 / CF</div>
          <div className={styles.statVal}>{src.capacityFactor}%</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>수명 / Lifespan</div>
          <div className={styles.statVal}>{src.lifespan}년</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>설치비 / CAPEX</div>
          <div className={styles.statVal} style={{ fontSize: '0.75rem' }}>${src.installCost.min}–{src.installCost.max}</div>
        </div>
      </div>

      {/* Expand */}
      <button className={styles.expandBtn} onClick={() => setOpen(o => !o)}>
        {open ? '▲ 접기' : '▼ 상세 / Details'}
      </button>

      {open && (
        <div className={`${styles.details} fade-in`}>
          <p className={styles.desc}>{src.description}</p>
          <p className={styles.descEn}>{src.descriptionEn}</p>

          <div className={styles.prosConsGrid}>
            <div>
              <div className={styles.pcLabel} style={{ color: '#22c55e' }}>✓ 장점 / Pros</div>
              {src.pros.map((p, i) => <div key={i} className={styles.pcItem}>{p}</div>)}
            </div>
            <div>
              <div className={styles.pcLabel} style={{ color: '#ef4444' }}>✗ 단점 / Cons</div>
              {src.cons.map((c, i) => <div key={i} className={styles.pcItem}>{c}</div>)}
            </div>
          </div>

          <div className={styles.trendNote}>
            📈 {src.trendKr} / {src.trendEn}
          </div>
        </div>
      )}
    </div>
  )
}

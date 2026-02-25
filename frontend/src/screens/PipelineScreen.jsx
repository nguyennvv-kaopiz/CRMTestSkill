import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPipeline, moveOpportunityStage } from '../api/opportunityApi';
import { getPipelineStages } from '../api/pipelineStagesApi';

function formatMoney(n) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(Number(n));
}

export default function PipelineScreen() {
  const [pipeline, setPipeline] = useState([]);
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    getPipeline().then(setPipeline).finally(() => setLoading(false));
    getPipelineStages().then(setStages);
  };

  useEffect(() => {
    load();
  }, []);

  const handleMove = (oppId, newStageId) => {
    moveOpportunityStage(oppId, newStageId).then(() => load());
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <>
      <header className="page-header">
        <h1>Pipeline</h1>
        <p className="subtitle">Cơ hội bán hàng theo giai đoạn</p>
      </header>
      <div className="pipeline-columns">
        {pipeline.map((col) => (
          <div key={col.id} className="pipeline-column">
            <h3>{col.name}</h3>
            {col.opportunities.map((opp) => (
              <div key={opp.id} className="pipeline-card">
                <div className="name">{opp.name}</div>
                <div className="muted">{opp.customer_name} · {formatMoney(opp.amount)}</div>
                <div className="muted">Xác suất: {opp.probability}%</div>
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                  <Link to={`/customers/${opp.customer_id}`} className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>KH</Link>
                  {stages.filter((s) => s.id !== opp.stage_id).map((s) => (
                    <button key={s.id} type="button" className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => handleMove(opp.id, s.id)}>{s.name}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

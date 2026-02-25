import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../api/orderApi';

function formatMoney(n) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(n));
}

function formatDate(d) {
  if (!d) return '—';
  const date = new Date(d);
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

export default function OrderListScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <>
      <header className="page-header">
        <h1>Đơn hàng</h1>
        <p className="subtitle">Danh sách {orders.length} đơn hàng</p>
      </header>
      <div className="card card-fill table-wrap">
        {orders.length === 0 ? (
          <div className="empty">
            <span className="empty-title">Chưa có đơn hàng nào</span>
            <span>Đơn hàng sẽ hiển thị tại đây</span>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng (ID)</th>
                <th className="text-right">Tổng tiền</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td><span className="badge badge-id">#{o.id}</span></td>
                  <td><Link to={`/customers/${o.customer_id}`}>#{o.customer_id}</Link></td>
                  <td className="text-right money">{formatMoney(o.total)}</td>
                  <td className="date">{formatDate(o.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

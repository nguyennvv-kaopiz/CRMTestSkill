import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import CustomerListScreen from './screens/CustomerListScreen';
import CustomerDetailScreen from './screens/CustomerDetailScreen';
import CustomerFormScreen from './screens/CustomerFormScreen';
import OrderListScreen from './screens/OrderListScreen';
import DashboardScreen from './screens/DashboardScreen';
import LeadListScreen from './screens/LeadListScreen';
import LeadDetailScreen from './screens/LeadDetailScreen';
import LeadFormScreen from './screens/LeadFormScreen';
import PipelineScreen from './screens/PipelineScreen';

function NavLink({ to, children }) {
  const location = useLocation();
  const active = to === '/'
    ? location.pathname === '/'
    : to === '/customers'
      ? location.pathname.startsWith('/customers')
      : to === '/leads'
        ? location.pathname.startsWith('/leads')
        : location.pathname.startsWith(to);
  return (
    <Link to={to} className={active ? 'active' : ''}>
      {children}
    </Link>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <aside className="sidebar">
          <div className="logo">CRM</div>
          <nav>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/customers">Khách hàng</NavLink>
            <NavLink to="/leads">Lead</NavLink>
            <NavLink to="/pipeline">Pipeline</NavLink>
            <NavLink to="/orders">Đơn hàng</NavLink>
          </nav>
        </aside>
        <main className="main">
          <Routes>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="/customers" element={<CustomerListScreen />} />
            <Route path="/customers/new" element={<CustomerFormScreen />} />
            <Route path="/customers/:id" element={<CustomerDetailScreen />} />
            <Route path="/customers/:id/edit" element={<CustomerFormScreen />} />
            <Route path="/orders" element={<OrderListScreen />} />
            <Route path="/leads" element={<LeadListScreen />} />
            <Route path="/leads/new" element={<LeadFormScreen />} />
            <Route path="/leads/:id" element={<LeadDetailScreen />} />
            <Route path="/pipeline" element={<PipelineScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

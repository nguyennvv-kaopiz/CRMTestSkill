-- Seed: companies
INSERT INTO companies (id, name, address) VALUES
  (1, 'Công ty TNHH ABC', 'Hà Nội'),
  (2, 'Công ty CP XYZ', 'TP.HCM'),
  (3, 'Cửa hàng DEF', 'Đà Nẵng')
ON CONFLICT (id) DO NOTHING;
SELECT setval('companies_id_seq', (SELECT COALESCE(MAX(id), 1) FROM companies));

-- Seed: customers (phone, company_id optional for compat)
INSERT INTO customers (id, name, email, phone, company_id) VALUES
  (1, 'Nguyễn Văn An', 'nguyen.van.an@example.com', '0901234567', 1),
  (2, 'Trần Thị Bình', 'tran.thi.binh@example.com', '0912345678', 1),
  (3, 'Lê Hoàng Cường', 'le.hoang.cuong@example.com', '0923456789', 2),
  (4, 'Phạm Minh Đức', 'pham.minh.duc@example.com', NULL, 2),
  (5, 'Hoàng Thu Hà', 'hoang.thu.ha@example.com', '0945678901', 3)
ON CONFLICT (id) DO NOTHING;
SELECT setval('customers_id_seq', (SELECT COALESCE(MAX(id), 1) FROM customers));

-- Seed: contacts
INSERT INTO contacts (id, customer_id, name, email, phone, role) VALUES
  (1, 1, 'Nguyễn Văn An', 'nguyen.van.an@example.com', '0901234567', 'Giám đốc'),
  (2, 2, 'Trần Thị Bình', 'tran.thi.binh@example.com', '0912345678', 'Kế toán'),
  (3, 3, 'Lê Hoàng Cường', 'le.hoang.cuong@example.com', '0923456789', 'Mua hàng')
ON CONFLICT (id) DO NOTHING;
SELECT setval('contacts_id_seq', (SELECT COALESCE(MAX(id), 1) FROM contacts));

-- Seed: customer_tags
INSERT INTO customer_tags (customer_id, tag) VALUES
  (1, 'VIP'),
  (1, 'Doanh nghiệp'),
  (2, 'Doanh nghiệp'),
  (3, 'Tiềm năng'),
  (5, 'VIP')
ON CONFLICT (customer_id, tag) DO NOTHING;

-- Seed: interaction_history
INSERT INTO interaction_history (id, customer_id, type, note) VALUES
  (1, 1, 'call', 'Gọi tư vấn sản phẩm mới'),
  (2, 1, 'email', 'Gửi báo giá'),
  (3, 2, 'meeting', 'Họp tại văn phòng'),
  (4, 3, 'call', 'Chăm sóc sau bán')
ON CONFLICT (id) DO NOTHING;
SELECT setval('interaction_history_id_seq', (SELECT COALESCE(MAX(id), 1) FROM interaction_history));

-- Seed: orders
INSERT INTO orders (id, customer_id, total, created_at) VALUES
  (1, 1, 1250000, '2024-01-15 10:30:00+07'),
  (2, 1, 890000,  '2024-02-01 14:00:00+07'),
  (3, 2, 2100000,'2024-01-20 09:15:00+07'),
  (4, 3, 450000, '2024-02-10 16:45:00+07'),
  (5, 3, 3200000,'2024-02-12 11:20:00+07'),
  (6, 4, 780000, '2024-01-25 08:00:00+07'),
  (7, 5, 1560000,'2024-02-05 13:30:00+07'),
  (8, 5, 990000,  '2024-02-18 10:00:00+07')
ON CONFLICT (id) DO NOTHING;
SELECT setval('orders_id_seq', (SELECT COALESCE(MAX(id), 1) FROM orders));

-- Seed: pipeline_stages
INSERT INTO pipeline_stages (id, name, sort_order) VALUES
  (1, 'Qualified', 10),
  (2, 'Proposal', 20),
  (3, 'Negotiation', 30),
  (4, 'Won', 40),
  (5, 'Lost', 50)
ON CONFLICT (id) DO NOTHING;
SELECT setval('pipeline_stages_id_seq', (SELECT COALESCE(MAX(id), 1) FROM pipeline_stages));

-- Seed: leads
INSERT INTO leads (id, name, email, phone, company_name, status, source) VALUES
  (1, 'Lê Minh Tuấn', 'tuan.le@example.com', '0987654321', 'Công ty Mới', 'new', 'Website'),
  (2, 'Phan Thị Hương', 'huong.phan@example.com', '0976543210', 'Shop Online', 'contacted', 'Facebook'),
  (3, 'Võ Đức Dũng', 'dung.vo@example.com', NULL, NULL, 'qualified', 'Referral')
ON CONFLICT (id) DO NOTHING;
SELECT setval('leads_id_seq', (SELECT COALESCE(MAX(id), 1) FROM leads));

-- Seed: opportunities
INSERT INTO opportunities (id, name, customer_id, amount, stage_id, probability, expected_close_date) VALUES
  (1, 'Dự án phần mềm A', 1, 50000000, 3, 70, '2024-03-15'),
  (2, 'Hợp đồng bảo trì B', 2, 12000000, 2, 50, '2024-03-01'),
  (3, 'Gói dịch vụ C', 5, 8000000, 1, 30, '2024-04-01')
ON CONFLICT (id) DO NOTHING;
SELECT setval('opportunities_id_seq', (SELECT COALESCE(MAX(id), 1) FROM opportunities));

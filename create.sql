drop database if exists developer;

create database developer;

drop schema if exists sale cascade;

create schema sale;

create table sale.order (
	order_id uuid,
	amount numeric,
	status text,
	created_at timestamptz,
	primary key (order_id)
);

create table sale.payment (
    payment_id uuid,
	order_id uuid,
    amount numeric,
	status text,
	payment_type text,
	created_at timestamptz,
	updated_at timestamptz,
	primary key (payment_id, order_id)
);


/*
INSERT INTO sale."order" (order_id, amount, status, created_at) VALUES
('3fa85f64-5717-4562-b3fc-2c963f66afa6', 150.00, 'CREATED', '2025-06-10T10:15:00Z'),
('1e2b4c7d-832b-4c23-a72a-9b1e8e614832', 299.99, 'CREATED', '2025-06-09T14:30:00Z'),
('7f6c3c88-e814-4cb2-87d5-5a1bcb2cf331', 89.50, 'CANCELLED', '2025-06-08T09:00:00Z'),
('cb42a5d0-6e6e-4c8f-9f1c-5f8e6a6d3271', 420.75, 'CREATED', '2025-06-10T16:45:00Z'),
('f08131d5-482b-4c94-831f-5f5f6ad3c641', 35.20, 'CANCELLED', '2025-06-11T08:00:00Z');

*/
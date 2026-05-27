-- Bangalore Parking Areas Seed Data
-- Run this in your Supabase SQL Editor

-- Insert Parking Areas
INSERT INTO areas (area_id, area_name, latitude, longitude) VALUES
('area_001', 'Whitefield', 12.9698, 77.7499),
('area_002', 'Indiranagar', 12.9716, 77.6412),
('area_003', 'Koramangala', 12.9352, 77.6245),
('area_004', 'MG Road', 12.9352, 77.6099),
('area_005', 'Malleswaram', 13.0012, 77.5706),
('area_006', 'Hebbal', 13.0201, 77.5901),
('area_007', 'Jayanagar', 12.9352, 77.5945),
('area_008', 'Marathahalli', 12.9698, 77.7069),
('area_009', 'Yeshwanthpur', 13.0359, 77.5904),
('area_010', 'Richmond Town', 12.9716, 77.6099),
('area_011', 'Banaswadi', 13.0266, 77.6255),
('area_012', 'Yelahanka', 13.0732, 77.6021)
ON CONFLICT (area_id) DO NOTHING;

-- Insert Parking Slots for each area
-- Whitefield (15 slots)
INSERT INTO parking_slots (slot_id, area_id, status) VALUES
('area_001-slot-01', 'area_001', 'available'),
('area_001-slot-02', 'area_001', 'available'),
('area_001-slot-03', 'area_001', 'occupied'),
('area_001-slot-04', 'area_001', 'available'),
('area_001-slot-05', 'area_001', 'available'),
('area_001-slot-06', 'area_001', 'occupied'),
('area_001-slot-07', 'area_001', 'available'),
('area_001-slot-08', 'area_001', 'available'),
('area_001-slot-09', 'area_001', 'available'),
('area_001-slot-10', 'area_001', 'occupied'),
('area_001-slot-11', 'area_001', 'available'),
('area_001-slot-12', 'area_001', 'available'),
('area_001-slot-13', 'area_001', 'available'),
('area_001-slot-14', 'area_001', 'occupied'),
('area_001-slot-15', 'area_001', 'available')
ON CONFLICT (slot_id) DO NOTHING;

-- Indiranagar (12 slots)
INSERT INTO parking_slots (slot_id, area_id, status) VALUES
('area_002-slot-01', 'area_002', 'available'),
('area_002-slot-02', 'area_002', 'occupied'),
('area_002-slot-03', 'area_002', 'available'),
('area_002-slot-04', 'area_002', 'available'),
('area_002-slot-05', 'area_002', 'available'),
('area_002-slot-06', 'area_002', 'occupied'),
('area_002-slot-07', 'area_002', 'available'),
('area_002-slot-08', 'area_002', 'available'),
('area_002-slot-09', 'area_002', 'available'),
('area_002-slot-10', 'area_002', 'occupied'),
('area_002-slot-11', 'area_002', 'available'),
('area_002-slot-12', 'area_002', 'available')
ON CONFLICT (slot_id) DO NOTHING;

-- Koramangala (18 slots)
INSERT INTO parking_slots (slot_id, area_id, status) VALUES
('area_003-slot-01', 'area_003', 'available'),
('area_003-slot-02', 'area_003', 'available'),
('area_003-slot-03', 'area_003', 'occupied'),
('area_003-slot-04', 'area_003', 'available'),
('area_003-slot-05', 'area_003', 'available'),
('area_003-slot-06', 'area_003', 'occupied'),
('area_003-slot-07', 'area_003', 'available'),
('area_003-slot-08', 'area_003', 'available'),
('area_003-slot-09', 'area_003', 'available'),
('area_003-slot-10', 'area_003', 'occupied'),
('area_003-slot-11', 'area_003', 'available'),
('area_003-slot-12', 'area_003', 'available'),
('area_003-slot-13', 'area_003', 'available'),
('area_003-slot-14', 'area_003', 'occupied'),
('area_003-slot-15', 'area_003', 'available'),
('area_003-slot-16', 'area_003', 'available'),
('area_003-slot-17', 'area_003', 'occupied'),
('area_003-slot-18', 'area_003', 'available')
ON CONFLICT (slot_id) DO NOTHING;

-- MG Road (20 slots)
INSERT INTO parking_slots (slot_id, area_id, status) VALUES
('area_004-slot-01', 'area_004', 'available'),
('area_004-slot-02', 'area_004', 'occupied'),
('area_004-slot-03', 'area_004', 'available'),
('area_004-slot-04', 'area_004', 'available'),
('area_004-slot-05', 'area_004', 'available'),
('area_004-slot-06', 'area_004', 'occupied'),
('area_004-slot-07', 'area_004', 'available'),
('area_004-slot-08', 'area_004', 'available'),
('area_004-slot-09', 'area_004', 'available'),
('area_004-slot-10', 'area_004', 'occupied'),
('area_004-slot-11', 'area_004', 'available'),
('area_004-slot-12', 'area_004', 'available'),
('area_004-slot-13', 'area_004', 'available'),
('area_004-slot-14', 'area_004', 'occupied'),
('area_004-slot-15', 'area_004', 'available'),
('area_004-slot-16', 'area_004', 'available'),
('area_004-slot-17', 'area_004', 'occupied'),
('area_004-slot-18', 'area_004', 'available'),
('area_004-slot-19', 'area_004', 'available'),
('area_004-slot-20', 'area_004', 'available')
ON CONFLICT (slot_id) DO NOTHING;

-- Malleswaram (10 slots)
INSERT INTO parking_slots (slot_id, area_id, status) VALUES
('area_005-slot-01', 'area_005', 'available'),
('area_005-slot-02', 'area_005', 'occupied'),
('area_005-slot-03', 'area_005', 'available'),
('area_005-slot-04', 'area_005', 'available'),
('area_005-slot-05', 'area_005', 'occupied'),
('area_005-slot-06', 'area_005', 'available'),
('area_005-slot-07', 'area_005', 'available'),
('area_005-slot-08', 'area_005', 'available'),
('area_005-slot-09', 'area_005', 'occupied'),
('area_005-slot-10', 'area_005', 'available')
ON CONFLICT (slot_id) DO NOTHING;

-- Hebbal (14 slots)
INSERT INTO parking_slots (slot_id, area_id, status) VALUES
('area_006-slot-01', 'area_006', 'available'),
('area_006-slot-02', 'area_006', 'available'),
('area_006-slot-03', 'area_006', 'occupied'),
('area_006-slot-04', 'area_006', 'available'),
('area_006-slot-05', 'area_006', 'available'),
('area_006-slot-06', 'area_006', 'available'),
('area_006-slot-07', 'area_006', 'occupied'),
('area_006-slot-08', 'area_006', 'available'),
('area_006-slot-09', 'area_006', 'available'),
('area_006-slot-10', 'area_006', 'occupied'),
('area_006-slot-11', 'area_006', 'available'),
('area_006-slot-12', 'area_006', 'available'),
('area_006-slot-13', 'area_006', 'available'),
('area_006-slot-14', 'area_006', 'available')
ON CONFLICT (slot_id) DO NOTHING;

-- Jayanagar (11 slots)
INSERT INTO parking_slots (slot_id, area_id, status) VALUES
('area_007-slot-01', 'area_007', 'available'),
('area_007-slot-02', 'area_007', 'occupied'),
('area_007-slot-03', 'area_007', 'available'),
('area_007-slot-04', 'area_007', 'available'),
('area_007-slot-05', 'area_007', 'occupied'),
('area_007-slot-06', 'area_007', 'available'),
('area_007-slot-07', 'area_007', 'available'),
('area_007-slot-08', 'area_007', 'available'),
('area_007-slot-09', 'area_007', 'available'),
('area_007-slot-10', 'area_007', 'occupied'),
('area_007-slot-11', 'area_007', 'available')
ON CONFLICT (slot_id) DO NOTHING;

-- Marathahalli (16 slots)
INSERT INTO parking_slots (slot_id, area_id, status) VALUES
('area_008-slot-01', 'area_008', 'available'),
('area_008-slot-02', 'area_008', 'available'),
('area_008-slot-03', 'area_008', 'occupied'),
('area_008-slot-04', 'area_008', 'available'),
('area_008-slot-05', 'area_008', 'available'),
('area_008-slot-06', 'area_008', 'occupied'),
('area_008-slot-07', 'area_008', 'available'),
('area_008-slot-08', 'area_008', 'available'),
('area_008-slot-09', 'area_008', 'available'),
('area_008-slot-10', 'area_008', 'available'),
('area_008-slot-11', 'area_008', 'occupied'),
('area_008-slot-12', 'area_008', 'available'),
('area_008-slot-13', 'area_008', 'available'),
('area_008-slot-14', 'area_008', 'available'),
('area_008-slot-15', 'area_008', 'occupied'),
('area_008-slot-16', 'area_008', 'available')
ON CONFLICT (slot_id) DO NOTHING;

-- Yeshwanthpur (13 slots)
INSERT INTO parking_slots (slot_id, area_id, status) VALUES
('area_009-slot-01', 'area_009', 'available'),
('area_009-slot-02', 'area_009', 'occupied'),
('area_009-slot-03', 'area_009', 'available'),
('area_009-slot-04', 'area_009', 'available'),
('area_009-slot-05', 'area_009', 'available'),
('area_009-slot-06', 'area_009', 'occupied'),
('area_009-slot-07', 'area_009', 'available'),
('area_009-slot-08', 'area_009', 'available'),
('area_009-slot-09', 'area_009', 'available'),
('area_009-slot-10', 'area_009', 'occupied'),
('area_009-slot-11', 'area_009', 'available'),
('area_009-slot-12', 'area_009', 'available'),
('area_009-slot-13', 'area_009', 'available')
ON CONFLICT (slot_id) DO NOTHING;

-- Richmond Town (9 slots)
INSERT INTO parking_slots (slot_id, area_id, status) VALUES
('area_010-slot-01', 'area_010', 'available'),
('area_010-slot-02', 'area_010', 'occupied'),
('area_010-slot-03', 'area_010', 'available'),
('area_010-slot-04', 'area_010', 'available'),
('area_010-slot-05', 'area_010', 'occupied'),
('area_010-slot-06', 'area_010', 'available'),
('area_010-slot-07', 'area_010', 'available'),
('area_010-slot-08', 'area_010', 'available'),
('area_010-slot-09', 'area_010', 'available')
ON CONFLICT (slot_id) DO NOTHING;

-- Banaswadi (12 slots)
INSERT INTO parking_slots (slot_id, area_id, status) VALUES
('area_011-slot-01', 'area_011', 'available'),
('area_011-slot-02', 'area_011', 'available'),
('area_011-slot-03', 'area_011', 'occupied'),
('area_011-slot-04', 'area_011', 'available'),
('area_011-slot-05', 'area_011', 'available'),
('area_011-slot-06', 'area_011', 'available'),
('area_011-slot-07', 'area_011', 'occupied'),
('area_011-slot-08', 'area_011', 'available'),
('area_011-slot-09', 'area_011', 'available'),
('area_011-slot-10', 'area_011', 'occupied'),
('area_011-slot-11', 'area_011', 'available'),
('area_011-slot-12', 'area_011', 'available')
ON CONFLICT (slot_id) DO NOTHING;

-- Yelahanka (15 slots)
INSERT INTO parking_slots (slot_id, area_id, status) VALUES
('area_012-slot-01', 'area_012', 'available'),
('area_012-slot-02', 'area_012', 'available'),
('area_012-slot-03', 'area_012', 'occupied'),
('area_012-slot-04', 'area_012', 'available'),
('area_012-slot-05', 'area_012', 'available'),
('area_012-slot-06', 'area_012', 'occupied'),
('area_012-slot-07', 'area_012', 'available'),
('area_012-slot-08', 'area_012', 'available'),
('area_012-slot-09', 'area_012', 'available'),
('area_012-slot-10', 'area_012', 'occupied'),
('area_012-slot-11', 'area_012', 'available'),
('area_012-slot-12', 'area_012', 'available'),
('area_012-slot-13', 'area_012', 'available'),
('area_012-slot-14', 'area_012', 'occupied'),
('area_012-slot-15', 'area_012', 'available')
ON CONFLICT (slot_id) DO NOTHING;

-- First, insert vehicles for the bookings
INSERT INTO vehicles (vehicle_number, customer_name, contact_number) VALUES
('KA-01AB2345', 'Rahul Kumar', '9876543210'),
('KA-02CD5678', 'Priya Sharma', '9876543211'),
('KA-03EF9012', 'Amit Patel', '9876543212'),
('KA-04GH3456', 'Sneha Gupta', '9876543213'),
('KA-05IJ7890', 'Vikram Singh', '9876543214'),
('KA-06KL1234', 'Neha Verma', '9876543215'),
('KA-07MN5678', 'Rohan Desai', '9876543216'),
('KA-08OP9012', 'Anjali Nair', '9876543217'),
('KA-09QR3456', 'Sanjay Kumar', '9876543218'),
('KA-10ST7890', 'Divya Rao', '9876543219')
ON CONFLICT (vehicle_number) DO NOTHING;

-- Sample Bookings (status: 'booked', 'active', 'completed', 'cancelled')
INSERT INTO bookings (slot_id, vehicle_number, entry_time, exit_time, amount_paid, status, payment_status) VALUES
('area_001-slot-02', 'KA-01AB2345', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '3 hours', 150, 'completed', 'paid'),
('area_002-slot-05', 'KA-02CD5678', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day' + INTERVAL '2 hours', 100, 'completed', 'paid'),
('area_003-slot-08', 'KA-03EF9012', NOW() - INTERVAL '12 hours', NOW() - INTERVAL '12 hours' + INTERVAL '4 hours', 200, 'completed', 'paid'),
('area_004-slot-12', 'KA-04GH3456', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '6 hours' + INTERVAL '5 hours', 250, 'completed', 'paid'),
('area_005-slot-03', 'KA-05IJ7890', NOW() - INTERVAL '3 hours', NOW() - INTERVAL '3 hours' + INTERVAL '2 hours', 100, 'completed', 'paid'),
('area_006-slot-07', 'KA-06KL1234', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 hour' + INTERVAL '6 hours', 300, 'active', 'paid'),
('area_007-slot-04', 'KA-07MN5678', NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '30 minutes' + INTERVAL '3 hours', 150, 'active', 'paid'),
('area_008-slot-11', 'KA-08OP9012', NOW() - INTERVAL '15 minutes', NOW() - INTERVAL '15 minutes' + INTERVAL '2 hours', 100, 'active', 'paid'),
('area_009-slot-06', 'KA-09QR3456', NOW() - INTERVAL '5 minutes', NOW() - INTERVAL '5 minutes' + INTERVAL '4 hours', 200, 'active', 'paid'),
('area_012-slot-10', 'KA-10ST7890', NOW(), NOW() + INTERVAL '2 hours', 100, 'booked', 'paid')
ON CONFLICT DO NOTHING;

-- Display summary
SELECT 
  (SELECT COUNT(*) FROM areas) as total_areas,
  (SELECT COUNT(*) FROM parking_slots) as total_slots,
  (SELECT COUNT(*) FROM bookings) as total_bookings;

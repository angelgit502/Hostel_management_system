# HMS MySQL Database Folder

This folder will house MySQL database schemas (`schema.sql`), seed data scripts, and database connection configurations.

### Planned Tables:
- `users` (id, full_name, email, password_hash, role, created_at)
- `students` (id, user_id, room_id, gender, dob, phone, address, checkin_status)
- `staff` (id, user_id, designation, phone, address, status)
- `rooms` (id, block, room_number, capacity, room_type, status)
- `complaints` (id, student_id, title, severity, status, created_at)
- `payments` (id, student_id, invoice_id, amount, status, date)

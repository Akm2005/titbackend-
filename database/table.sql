CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contact_no VARCHAR(15),
    role VARCHAR(20) CHECK (role IN ('Admin', 'Team Lead', 'Support Person', 'User')) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
ALTER TABLE users
ADD COLUMN password VARCHAR(255) NOT NULL;

CREATE TABLE tickets (
    ticket_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    assigned_to INT,
    subject TEXT NOT NULL,
    description TEXT,
    status VARCHAR(20) CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')) NOT NULL DEFAULT 'Open',
    priority VARCHAR(20) CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')) NOT NULL DEFAULT 'Low',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(user_id) ON DELETE SET NULL
);
CREATE TABLE ticket_logs (
    log_id SERIAL PRIMARY KEY,
    ticket_id INT NOT NULL,
    action_by INT NOT NULL,
    action TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id) ON DELETE CASCADE,
    FOREIGN KEY (action_by) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE user_sync_log (
    sync_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    sync_status VARCHAR(20) CHECK (sync_status IN ('Success', 'Failed')) NOT NULL,
    sync_time TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE guests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    attendance VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
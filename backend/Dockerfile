# Use a lightweight Python base image
FROM python:3.11-slim

# Install Node.js runtime
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Node dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application files
COPY . .

# Expose server port (Cloud Run sets PORT automatically)
EXPOSE 5000

CMD ["node", "server.js"]
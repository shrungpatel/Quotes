FROM python:3.11-slim

RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

RUN npm init -y && \
    npm install --omit=dev \
        express@4.21.2 \
        cors@2.8.5 \
        firebase-admin@13.4.0

COPY server.js map.py serviceAccountKey.json ./

RUN mkdir -p Outputs && \
    useradd --create-home --shell /usr/sbin/nologin appuser && \
    chown -R appuser:appuser /app
USER appuser

EXPOSE 8080

CMD ["node", "server.js"]
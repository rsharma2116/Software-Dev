FROM python:3.10-slim

WORKDIR /app
ENV PYTHONPATH=/app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "run.py"]

import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_search_empty():
    response = client.post('/search', json={"query": "", "filters": {}})
    assert response.status_code == 200

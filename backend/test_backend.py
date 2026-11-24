import sys
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_api():
    print("1. Testing root endpoint...")
    r = client.get("/")
    assert r.status_code == 200, f"Root failed: {r.text}"
    print(" Root OK:", r.json()["app"])

    print("2. Testing login with demo user...")
    r = client.post("/api/auth/login", json={"login": "demo@portfoliocraft.com", "password": "password123"})
    assert r.status_code == 200, f"Login failed: {r.text}"
    token = r.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print(" Login OK. Token received.")

    print("3. Testing get user portfolio...")
    r = client.get("/api/portfolio", headers=headers)
    assert r.status_code == 200, f"Get portfolio failed: {r.text}"
    data = r.json()
    assert data["full_name"] == "Alex Morgan"
    assert len(data["skills"]) > 0
    assert len(data["projects"]) > 0
    print(f" Portfolio OK. Completion: {data['completion_percentage']}%")

    print("4. Testing public portfolio endpoint...")
    r = client.get("/api/public/alexmorgan")
    assert r.status_code == 200, f"Public portfolio failed: {r.text}"
    assert r.json()["full_name"] == "Alex Morgan"
    print(" Public portfolio OK.")

    print("5. Testing contact submission...")
    r = client.post("/api/public/alexmorgan/contact", json={
        "sender_name": "Test Recruiter",
        "sender_email": "recruiter@company.com",
        "subject": "Interview Invitation",
        "message": "We loved your profile and want to interview you!"
    })
    assert r.status_code == 200, f"Contact submission failed: {r.text}"
    print(" Contact submission OK.")

    print("6. Testing get contact messages...")
    r = client.get("/api/portfolio/messages", headers=headers)
    assert r.status_code == 200
    msgs = r.json()
    assert len(msgs) >= 2
    print(f" Inquiries OK. Found {len(msgs)} messages.")

    print("ALL BACKEND TESTS PASSED SUCCESSFULLY! 🎉")

if __name__ == "__main__":
    test_api()

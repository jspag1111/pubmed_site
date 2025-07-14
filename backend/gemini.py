import os
from typing import Dict, List
import requests

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"


def build_prompt(abstract: str, fields: List[str]) -> str:
    keys = ", ".join(fields)
    return (
        "You are a medical literature analyst. Given a PubMed abstract and a list "
        "of fields (keys), extract information for each key as accurately as "
        "possible from the abstract, and generate a summary. If a key is not "
        "present, return 'Not reported'.\n\n"
        f"Abstract: {abstract}\n"
        f"Keys to extract: {fields}\n"
        "Return output as JSON with a 'summary' field and each key." )


def summarize_abstracts(abstracts: Dict[str, str], fields: List[str]) -> Dict[str, Dict]:
    summaries = {}
    headers = {"Content-Type": "application/json"}
    for pmid, abstract in abstracts.items():
        prompt = build_prompt(abstract, fields)
        body = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"temperature": 0.2}
        }
        params = {"key": GEMINI_API_KEY} if GEMINI_API_KEY else {}
        r = requests.post(GEMINI_ENDPOINT, json=body, params=params, headers=headers)
        if r.status_code != 200:
            summaries[pmid] = {"error": r.text}
            continue
        data = r.json()
        try:
            text = data["candidates"][0]["content"]["parts"][0]["text"]
        except Exception:
            summaries[pmid] = {"error": "Invalid response"}
            continue
        summaries[pmid] = {"response": text}
    return summaries

import os
import requests
from typing import List, Dict

PUBMED_API_KEY = os.getenv("PUBMED_API_KEY")
BASE_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"


def search_pubmed(query: str, filters: Dict) -> List[Dict]:
    if not query:
        return []

    params = {
        "db": "pubmed",
        "term": query,
        "retmode": "json",
        "retmax": 20,
    }
    if PUBMED_API_KEY:
        params["api_key"] = PUBMED_API_KEY

    if filters.get("year_start"):
        params["mindate"] = filters["year_start"]
    if filters.get("year_end"):
        params["maxdate"] = filters["year_end"]
    if filters.get("article_type"):
        params["filter"] = filters["article_type"]

    r = requests.get(f"{BASE_URL}/esearch.fcgi", params=params)
    r.raise_for_status()
    id_list = r.json()["esearchresult"].get("idlist", [])

    if not id_list:
        return []

    summary_params = {
        "db": "pubmed",
        "id": ",".join(id_list),
        "retmode": "json",
    }
    if PUBMED_API_KEY:
        summary_params["api_key"] = PUBMED_API_KEY

    r = requests.get(f"{BASE_URL}/esummary.fcgi", params=summary_params)
    r.raise_for_status()
    data = r.json()["result"]
    results = []
    for pid in id_list:
        item = data.get(pid)
        if item:
            results.append({
                "pmid": pid,
                "title": item.get("title"),
                "pubdate": item.get("pubdate"),
                "journal": item.get("fulljournalname"),
            })
    return results


def fetch_abstracts(pmids: List[str]) -> Dict[str, str]:
    if not pmids:
        return {}

    params = {
        "db": "pubmed",
        "id": ",".join(pmids),
        "retmode": "text",
    }
    if PUBMED_API_KEY:
        params["api_key"] = PUBMED_API_KEY

    r = requests.get(f"{BASE_URL}/efetch.fcgi", params=params)
    r.raise_for_status()

    abstracts = {}
    # Simple parsing: split by PMID
    text = r.text
    entries = text.split("\n\n")
    for entry in entries:
        if not entry.strip():
            continue
        lines = entry.strip().split("\n")
        pmid = lines[0].strip()
        abstract = "\n".join(lines[1:]).strip()
        abstracts[pmid] = abstract
    return abstracts

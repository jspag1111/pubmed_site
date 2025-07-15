# PubMed Summarizer

This repository contains a demo full‑stack application that queries PubMed, lets you select articles and then generates AI summaries with the Gemini API. The project is split into a Python backend built with **FastAPI** and a React frontend styled with **Tailwind CSS**.

## Features

- Search PubMed by keyword with optional filters for publication year and article type
- Display basic metadata (PMID, title, journal, publication date) in a results table
- Select which articles to analyse
- Define custom key‑value fields to extract from each abstract
- Generate summaries and structured data using the Gemini large language model
- Export the returned information as **CSV** or **JSON**
- Basic unit tests for both backend and frontend

## Requirements

- Python 3.10 or newer
- Node.js 18 or newer with npm
 - Google Gemini API key (PubMed API key optional)

## Setup

### 1. Clone and prepare the repository
```bash
git clone <repo-url>
cd pubmed_site
```

### 2. Backend
1. Create a virtual environment and install dependencies
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
2. Copy the example environment file and add your API keys
   ```bash
   cp backend/.env.example backend/.env
   # edit backend/.env and set GEMINI_API_KEY (PUBMED_API_KEY is optional)
   ```
3. Start the FastAPI application
   ```bash
   uvicorn backend.main:app --reload
   ```
   The API is now available at `http://localhost:8000`.
4. Run backend tests (optional)
   ```bash
   pytest
   ```

### 3. Frontend
1. Install npm packages
   ```bash
   cd frontend
   npm install
   ```
2. Launch the development server
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173` in your browser.
3. Build production assets (optional)
   ```bash
   npm run build
   ```
4. Run frontend tests (optional)
   ```bash
   npx vitest run --environment jsdom
   ```

## Usage

1. With both servers running, open the frontend in your browser.
2. Enter a medical question or topic in the search field and apply any filters you like.
3. Click **Search** to retrieve articles from PubMed. The results table shows key information about each article.
4. Select one or more articles using the check boxes.
5. In the extraction form, list the fields you want to pull from each abstract (for example: `Population`, `Intervention`, `Primary Outcome`).
6. Click **Summarize**. The backend fetches the abstracts, sends them to Gemini and returns a JSON object containing a summary and the values for your fields.
7. View the AI generated results below the form. Use the **Export** button to download the data as a CSV or JSON file for further analysis.

## API Endpoints

### `POST /search`
Searches PubMed and returns a list of articles.
```json
{
  "query": "heart failure",
  "filters": {
    "year_start": 2015,
    "year_end": 2025,
    "article_type": "Clinical Trial"
  }
}
```

### `POST /summarize`
Generates summaries and extracts data from provided PMIDs.
```json
{
  "pmids": ["12345678", "23456789"],
  "fields": ["Population", "Intervention", "Outcome"]
}
```

## Running Tests

- Backend tests: `pytest`
- Frontend tests: `npx vitest run --environment jsdom`

## Project Structure
```
backend/  - FastAPI application
frontend/ - React client using Vite and Tailwind CSS
```

The project is meant as a lightweight example and can be extended with additional filters, caching or a database as needed.

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .pubmed import search_pubmed, fetch_abstracts
from .gemini import summarize_abstracts
from .schemas import SearchRequest, SearchResponse, SummarizeRequest, SummarizeResponse

app = FastAPI(title="PubMed Summarizer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/search", response_model=SearchResponse)
async def search(req: SearchRequest):
    try:
        results = search_pubmed(req.query, req.filters)
        return SearchResponse(results=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/summarize", response_model=SummarizeResponse)
async def summarize(req: SummarizeRequest):
    try:
        abstracts = fetch_abstracts(req.pmids)
        summaries = summarize_abstracts(abstracts, req.fields)
        return SummarizeResponse(summaries=summaries)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

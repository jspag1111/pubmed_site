from typing import List, Dict, Optional
from pydantic import BaseModel

class SearchFilters(BaseModel):
    year_start: Optional[int] = None
    year_end: Optional[int] = None
    article_type: Optional[str] = None

class SearchRequest(BaseModel):
    query: str
    filters: SearchFilters

class ArticleMetadata(BaseModel):
    pmid: str
    title: str
    pubdate: str
    journal: str

class SearchResponse(BaseModel):
    results: List[ArticleMetadata]

class SummarizeRequest(BaseModel):
    pmids: List[str]
    fields: List[str]

class SummarizedArticle(BaseModel):
    pmid: str
    response: Dict[str, str] | None = None
    error: Optional[str] = None

class SummarizeResponse(BaseModel):
    summaries: Dict[str, Dict]

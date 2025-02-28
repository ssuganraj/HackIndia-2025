from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings  # Updated import
from config.settings import settings

class AgriKnowledgeBase:
    def __init__(self):
        self.vector_store = None
        self.embeddings = HuggingFaceEmbeddings(
            model_name=settings.EMBEDDING_MODEL
        )
    
    def initialize(self):
        """Build vector store from agriculture data"""
        loader = WebBaseLoader(
            settings.DATA_SOURCES,
            header_template={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
        )
        docs = loader.load()
        
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        splits = text_splitter.split_documents(docs)
        
        self.vector_store = FAISS.from_documents(
            splits,
            self.embeddings
        )
    
    def retrieve_context(self, query: str, k: int = 3) -> list:
        """Retrieve top-k relevant chunks"""
        if not self.vector_store:
            self.initialize()
        return self.vector_store.similarity_search(query, k=k)
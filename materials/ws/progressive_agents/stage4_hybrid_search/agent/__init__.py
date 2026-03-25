"""
Course Q&A Agent - Stage 4 ReAct (Hybrid Search with NER + ReAct Loop)

A LangGraph-based agent for answering questions about courses using:
- Hybrid search (semantic + exact match)
- Named Entity Recognition (NER) for course codes
- ReAct (Reasoning + Acting) loop for explicit reasoning

This is an alternative to Stage 4 that adds ReAct capabilities.
"""


# Environment setup — must run before any submodule reads os.getenv()
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv(usecwd=True))
if os.getenv("LOCAL") == "true" and not os.getenv("OPENAI_API_KEY") and os.getenv("GENAI_WKSHP_OPENAI_API_KEY"):
    os.environ["OPENAI_API_KEY"] = os.environ["GENAI_WKSHP_OPENAI_API_KEY"]

from .chat_interface import start_chat
from .setup import cleanup_courses, initialize_course_manager, setup_agent
from .state import WorkflowMetrics, WorkflowState, initialize_metrics
from .tools import optimize_course_text, search_courses_tool, transform_course_to_text
from .workflow import create_workflow, run_agent, run_agent_async

__all__ = [
    # State management
    "WorkflowState",
    "WorkflowMetrics",
    "initialize_metrics",
    # Workflow
    "create_workflow",
    "run_agent",
    "run_agent_async",
    # Setup
    "setup_agent",
    "initialize_course_manager",
    "cleanup_courses",
    # Tools
    "search_courses_tool",
    "transform_course_to_text",
    "optimize_course_text",
    # Chat interface
    "start_chat",
]

__version__ = "0.1.0"


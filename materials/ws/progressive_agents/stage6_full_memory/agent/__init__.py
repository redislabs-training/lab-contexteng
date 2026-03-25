"""
Course Q&A Agent - Stage 6 (Full Memory Agent)

A LangGraph-based agent for answering questions about courses with working memory
and long-term memory for multi-turn conversations. This is Stage 6 of the progressive learning path.

Extends Stage 5 with long-term memory tools (search/store).
"""

# Environment setup — must run before any submodule reads os.getenv()
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv(usecwd=True))
if os.getenv("LOCAL") == "true" and not os.getenv("OPENAI_API_KEY") and os.getenv("GENAI_WKSHP_OPENAI_API_KEY"):
    os.environ["OPENAI_API_KEY"] = os.environ["GENAI_WKSHP_OPENAI_API_KEY"]

from .chat_interface import get_session_info, new_session, start_chat
from .nodes import get_memory_client
from .setup import cleanup_courses, initialize_course_manager, setup_agent
from .state import WorkflowMetrics, WorkflowState, initialize_metrics, initialize_state
from .tools import optimize_course_text, search_courses, transform_course_to_text
from .workflow import create_workflow, run_agent, run_agent_async
from agent_memory_client.models import MemoryMessage, WorkingMemory

__all__ = [
    # State management
    "WorkflowState",
    "WorkflowMetrics",
    "initialize_metrics",
    "initialize_state",
    # Workflow
    "create_workflow",
    "run_agent",
    "run_agent_async",
    # Setup
    "setup_agent",
    "initialize_course_manager",
    "cleanup_courses",
    # Tools
    "search_courses",
    "transform_course_to_text",
    "optimize_course_text",
    # Chat interface
    "start_chat",
    "new_session",
    "get_session_info",
    # Memory
    "get_memory_client",
    "MemoryMessage",
    "WorkingMemory",
]

__version__ = "0.1.0"

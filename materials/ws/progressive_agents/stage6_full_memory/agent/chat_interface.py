"""
Chat interface wrappers for Stage 6 Full Memory Agent.

This module provides simple entry points for starting chat sessions,
hiding the implementation details behind clean function calls.
"""

import time
from datetime import datetime
from typing import Optional

from .chat_ui import build_chat_ui
from .workflow import run_agent_async


# Global state for session management
_current_session_id: Optional[str] = None
_current_student_id: Optional[str] = None


def start_chat(workflow, student_id: str = "student_001", session_id: Optional[str] = None):
    """
    Start a chat session with the Stage 6 agent.

    Args:
        workflow: Compiled LangGraph workflow from create_workflow()
        student_id: User identifier for memory personalization
        session_id: Optional session ID (auto-generated if not provided)

    Example:
        >>> from agent import setup_agent, create_workflow
        >>> course_manager, _ = await setup_agent(auto_load_courses=True)
        >>> workflow = create_workflow(course_manager, verbose=False)
        >>> start_chat(workflow, student_id="alice")
    """
    global _current_session_id, _current_student_id

    _current_student_id = student_id
    _current_session_id = session_id or f"session_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

    async def send(query: str) -> dict:
        """Process a query through the agent workflow."""
        start_time = time.perf_counter()

        result = await run_agent_async(
            workflow,
            query=query,
            session_id=_current_session_id,
            student_id=_current_student_id,
            enable_caching=False,
        )

        elapsed = time.perf_counter() - start_time

        return {
            "text": result.get("final_response", "No response generated."),
            "elapsed": elapsed,
            "used_memory": bool(result.get("working_memory")),
            "react_iterations": result.get("react_iterations", 0),
            "reasoning_trace": result.get("reasoning_trace", []),
        }

    print(f"""
Stage 6 Full Memory Agent
{'=' * 40}
Student: {_current_student_id}
Session: {_current_session_id}
""")

    build_chat_ui(send)


def new_session(workflow, student_id: Optional[str] = None):
    """
    Start a new chat session (clears conversation history).

    Args:
        workflow: Compiled LangGraph workflow
        student_id: Optional new student ID (keeps current if not provided)
    """
    global _current_session_id, _current_student_id

    if student_id:
        _current_student_id = student_id

    _current_session_id = f"session_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

    start_chat(workflow, student_id=_current_student_id, session_id=_current_session_id)


def get_session_info() -> dict:
    """Get current session information."""
    return {
        "student_id": _current_student_id,
        "session_id": _current_session_id,
    }


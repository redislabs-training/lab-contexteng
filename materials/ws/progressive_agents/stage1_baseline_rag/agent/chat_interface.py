"""
Chat interface wrappers for Stage 1 Baseline RAG Agent.

This module provides simple entry points for starting chat sessions,
hiding the implementation details behind clean function calls.
"""

import time
from typing import Optional

from .chat_ui import build_chat_ui
from .state import initialize_state


def start_chat(workflow):
    """
    Start a chat session with the Stage 1 Baseline RAG agent.

    Args:
        workflow: Compiled LangGraph workflow from create_workflow()

    Example:
        >>> from agent import setup_agent
        >>> from agent.workflow import create_workflow
        >>> workflow, course_manager = setup_agent(auto_load_courses=True)
        >>> start_chat(workflow)
    """

    async def send(query: str) -> dict:
        """Process a query through the agent workflow."""
        start_time = time.perf_counter()

        # Initialize state and run workflow (synchronous)
        state = initialize_state(query)
        result = workflow.invoke(state)

        elapsed = time.perf_counter() - start_time

        return {
            "text": result.get("final_answer", "No response generated."),
            "elapsed": elapsed,
            "courses_found": result.get("courses_found", 0),
        }

    print(f"""
Stage 1: Baseline RAG Agent
{'=' * 40}
No context engineering - raw course data
""")

    build_chat_ui(send)


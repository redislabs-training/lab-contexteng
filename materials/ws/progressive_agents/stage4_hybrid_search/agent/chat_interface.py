"""
Chat interface wrappers for Stage 4 Hybrid Search Agent.

This module provides simple entry points for starting chat sessions,
hiding the implementation details behind clean function calls.
"""

import time

from .chat_ui import build_chat_ui
from .workflow import run_agent_async


def start_chat(workflow):
    """
    Start a chat session with the Stage 4 Hybrid Search agent.

    Args:
        workflow: Compiled LangGraph workflow from create_workflow()

    Example:
        >>> from agent import setup_agent, create_workflow
        >>> course_manager = await setup_agent(auto_load_courses=True)
        >>> workflow = create_workflow(course_manager, verbose=False)
        >>> start_chat(workflow)
    """

    async def send(query: str) -> dict:
        """Process a query through the agent workflow."""
        start_time = time.perf_counter()

        result = await run_agent_async(
            workflow,
            query=query,
            enable_caching=False,
        )

        elapsed = time.perf_counter() - start_time

        return {
            "text": result.get("final_response", "No response generated."),
            "elapsed": elapsed,
            "react_iterations": result.get("react_iterations", 0),
            "reasoning_trace": result.get("reasoning_trace", []),
        }

    print(f"""
Stage 4: Hybrid Search Agent with ReAct
{'=' * 40}
Combines semantic + exact match search
Uses ReAct reasoning loop
""")

    build_chat_ui(send)


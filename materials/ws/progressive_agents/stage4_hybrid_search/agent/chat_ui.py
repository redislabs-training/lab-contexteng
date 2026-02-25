"""
Reusable chat UI widget for Jupyter notebooks.

This module provides a clean, widget-based chat interface that can be used
with any async callback function. Based on the pattern from Redis technical seminars.
"""

import asyncio
from datetime import datetime
from typing import Awaitable, Callable

import ipywidgets as widgets
from IPython.display import Javascript, display


def build_chat_ui(send_callback: Callable[[str], Awaitable[str | dict]]):
    """
    Build and display a chat UI widget.

    Args:
        send_callback: Async function that takes a query string and returns
                      either a string response or a dict with keys:
                      - text: The response text
                      - elapsed: (optional) Time in seconds
                      - react_iterations: (optional) Number of ReAct iterations
                      - reasoning_trace: (optional) List of reasoning steps
    """
    chat_history = widgets.Output(
        layout=widgets.Layout(
            border="none",
            padding="15px",
            width="100%",
            height="350px",
            overflow="scroll",
            background="#fafafa",
            box_sizing="border-box",
            flex="1",
            display="flex",
            flex_flow="wrap-reverse",
            margin="0",
        )
    )
    chat_history.add_class("chat-scrollbox")

    input_container = widgets.HBox(
        [
            widgets.Text(
                value="",
                placeholder="Ask a question...",
                layout=widgets.Layout(flex="1", margin="0 10px 0 0"),
            ),
            widgets.Button(
                description="Submit",
                button_style="primary",
                layout=widgets.Layout(width="80px"),
            ),
        ],
        layout=widgets.Layout(
            width="100%",
            padding="10px",
            border_top="1px solid #ddd",
            background="white",
            flex="0 0 auto",
        ),
    )
    input_container.add_class("chat-inputbox")

    question_input = input_container.children[0]
    submit_button = input_container.children[1]

    main_container = widgets.VBox(
        [chat_history, input_container],
        layout=widgets.Layout(
            width="95%",
            max_width="900px",
            height="450px",
            margin="10px auto",
            border="1px solid #ccc",
            background="white",
            border_radius="8px",
            overflow="hidden",
            display="flex",
            flex_flow="column",
        ),
    )

    def scroll_to_bottom():
        display(
            Javascript(
                """
            const out = document.querySelector('.chat-scrollbox');
            if (out) { out.scrollTop = out.scrollHeight; }
        """
            )
        )

    async def handle_question(query):
        submit_button.disabled = True

        if hasattr(handle_question, "call_count"):
            chat_history.append_stdout("─" * 50 + "\n\n")
        else:
            handle_question.call_count = 0
        handle_question.call_count += 1

        timestamp = datetime.now().strftime("%H:%M")
        chat_history.append_stdout(f"[{timestamp}] You: {query}\n\n")
        chat_history.append_stdout(f"[{timestamp}] Assistant: Thinking...\n\n")

        try:
            response = await send_callback(query)

            if isinstance(response, dict):
                chat_history.append_stdout(f"{response.get('text', response)}\n\n")
                status_parts = []

                if "elapsed" in response:
                    status_parts.append(f"Took {response['elapsed']:.2f}s")
                if "react_iterations" in response:
                    status_parts.append(f"{response['react_iterations']} iterations")

                if status_parts:
                    chat_history.append_stdout(" | ".join(status_parts) + "\n\n")

                # Show reasoning trace if available
                if response.get("reasoning_trace"):
                    trace = response["reasoning_trace"]
                    chat_history.append_stdout("--- Reasoning Trace ---\n")
                    for step in trace[:5]:  # Limit to 5 steps
                        step_type = step.get("type", "step")
                        content = str(step.get("content", ""))[:200]
                        chat_history.append_stdout(f"  [{step_type}] {content}\n")
                    chat_history.append_stdout("\n")
            else:
                chat_history.append_stdout(f"{response}\n\n")

        except Exception as e:
            chat_history.append_stdout(f"Error: {type(e).__name__}: {e}\n\n")

        finally:
            submit_button.disabled = False
            scroll_to_bottom()

    def on_submit(_):
        query = question_input.value.strip()
        if query:
            question_input.value = ""
            asyncio.get_event_loop().create_task(handle_question(query))

    submit_button.on_click(on_submit)
    question_input.on_submit(lambda _: on_submit(None))

    chat_history.append_stdout(
        "Welcome! Ask me anything about courses.\n"
        "This is Stage 4: Hybrid Search with ReAct reasoning.\n\n"
    )
    display(main_container)


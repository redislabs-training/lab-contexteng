"""
Reusable chat UI widget for Jupyter notebooks.

Based on ipywidgets, provides a clean chat interface that can be
connected to any async callback function.
"""

from datetime import datetime
from typing import Awaitable, Callable

import ipywidgets as widgets
from IPython.display import display


def build_chat_ui(send_callback: Callable[[str], Awaitable[str | dict]]):
    """
    Build and display a chat UI widget.

    Args:
        send_callback: Async function that takes a query string and returns
                      either a string response or a dict with 'text' and optional metadata
    """
    # Chat history display
    chat_history = widgets.Output(
        layout=widgets.Layout(
            height="400px",
            overflow_y="auto",
            border="1px solid #ccc",
            padding="10px",
        )
    )

    # Input field
    input_field = widgets.Text(
        placeholder="Type your question here...",
        layout=widgets.Layout(width="85%"),
    )

    # Send button
    send_button = widgets.Button(
        description="Send",
        button_style="primary",
        layout=widgets.Layout(width="14%"),
    )

    # Input row
    input_row = widgets.HBox(
        [input_field, send_button],
        layout=widgets.Layout(width="100%", margin="10px 0"),
    )

    # Main container
    main_container = widgets.VBox(
        [chat_history, input_row],
        layout=widgets.Layout(width="100%", padding="10px"),
    )

    # Store messages for re-rendering
    messages = []

    def render_messages():
        """Re-render all messages."""
        chat_history.clear_output(wait=True)
        with chat_history:
            print("Welcome! Ask me anything about courses.")
            print("This is Stage 4: Hybrid Search with ReAct reasoning.")
            print("-" * 50)
            for msg in messages:
                role, content, metadata = msg
                timestamp = metadata.get("timestamp", "")
                if role == "user":
                    print(f"\n[{timestamp}] You: {content}")
                else:
                    print(f"\n[{timestamp}] Assistant: {content}")
                    if metadata.get("elapsed"):
                        print(f"\nTook {metadata['elapsed']:.2f}s", end="")
                    if metadata.get("react_iterations"):
                        print(f" | {metadata['react_iterations']} iterations", end="")
                    print()
                    if metadata.get("reasoning_trace"):
                        print("\n--- Reasoning Trace ---")
                        for step in metadata["reasoning_trace"]:
                            if "thought" in step:
                                print(f"  [thought] {step['thought'][:100]}")
                            if "action" in step:
                                print(f"  [action] {step['action']}")
                            if "finish" in step:
                                print(f"  [finish] {step['finish']}")
                print()

    async def handle_send(_=None):
        """Handle send button click or enter key."""
        query = input_field.value.strip()
        if not query:
            return

        # Clear input
        input_field.value = ""
        timestamp = datetime.now().strftime("%H:%M")

        # Add user message
        messages.append(("user", query, {"timestamp": timestamp}))
        render_messages()

        # Show thinking indicator
        with chat_history:
            print("\nAssistant: Thinking...")

        # Get response
        try:
            response = await send_callback(query)

            if isinstance(response, dict):
                text = response.get("text", str(response))
                metadata = {k: v for k, v in response.items() if k != "text"}
            else:
                text = str(response)
                metadata = {}

            metadata["timestamp"] = timestamp
            messages.append(("assistant", text, metadata))
            render_messages()

        except Exception as e:
            messages.append(("assistant", f"Error: {e}", {"timestamp": timestamp}))
            render_messages()

    def on_button_click(_):
        import asyncio
        asyncio.get_event_loop().run_until_complete(handle_send())

    def on_enter(change):
        if change.get("type") == "change" and change.get("name") == "value":
            return
        import asyncio
        asyncio.get_event_loop().run_until_complete(handle_send())

    send_button.on_click(on_button_click)
    input_field.on_submit(on_enter)

    # Display welcome message
    render_messages()

    display(main_container)


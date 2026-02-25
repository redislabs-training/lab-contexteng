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

    def add_message(role: str, content: str, metadata: dict = None):
        """Add a message to the chat history."""
        timestamp = datetime.now().strftime("%H:%M")
        with chat_history:
            if role == "user":
                print(f"\n[{timestamp}] You: {content}")
            else:
                print(f"\n[{timestamp}] Assistant: {content}")
                if metadata:
                    if metadata.get("elapsed"):
                        print(f"\nTook {metadata['elapsed']:.2f}s", end="")
                    if metadata.get("courses_found"):
                        print(f" | {metadata['courses_found']} courses found", end="")
                    print()

    async def handle_send(_=None):
        """Handle send button click or enter key."""
        query = input_field.value.strip()
        if not query:
            return

        # Clear input
        input_field.value = ""

        # Show user message
        add_message("user", query)

        # Show thinking indicator
        with chat_history:
            print("\nAssistant: Thinking...")

        # Get response
        try:
            import asyncio
            response = await send_callback(query)

            # Clear thinking indicator by adding response
            if isinstance(response, dict):
                text = response.get("text", str(response))
                metadata = {k: v for k, v in response.items() if k != "text"}
            else:
                text = str(response)
                metadata = None

            # Clear the "Thinking..." and show actual response
            chat_history.clear_output(wait=True)
            with chat_history:
                # Re-render chat history would be complex, just show response
                print(f"Response: {text}")
                if metadata:
                    if metadata.get("elapsed"):
                        print(f"\nTook {metadata['elapsed']:.2f}s", end="")
                    if metadata.get("courses_found"):
                        print(f" | {metadata['courses_found']} courses found", end="")
                    print()

        except Exception as e:
            with chat_history:
                print(f"\nError: {e}")

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
    with chat_history:
        print("Welcome! Ask me anything about courses.")
        print("This is Stage 1: Baseline RAG (no context engineering).")
        print("-" * 50)

    display(main_container)


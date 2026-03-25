"""
Integration test for conversation context fix.
Tests the exact scenario reported by user:
1. "I want to learn linear algebra" -> Agent recommends MATH022
2. "What are the prerequisites for this course?" -> Agent should NOT ask "which course?"
3. "Give me more details about it" -> Agent should NOT ask for clarification

Prerequisites:
- OPENAI_API_KEY environment variable must be set
- Redis must be running on port 6379
- Redis Agent Memory Server (RAMS) must be running on port 8088

Run with:
    OPENAI_API_KEY='your-key' python test_conversation_flow.py
"""

import asyncio
import os
import sys
import uuid
from pathlib import Path

# Check for API key before importing anything that needs it
if not os.environ.get("OPENAI_API_KEY"):
    print("ERROR: OPENAI_API_KEY environment variable is not set.")
    print("Run with: OPENAI_API_KEY='your-key' python test_conversation_flow.py")
    sys.exit(1)

# Add correct paths for imports
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "src"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from redis_context_course import CourseManager
from agent.workflow import create_workflow, run_agent_async

CLARIFICATION_PHRASES = [
    "which course",
    "could you specify",
    "please specify",
    "what course are you referring",
    "can you clarify",
]


def check_asked_clarification(response: str) -> bool:
    """Check if the response asks for clarification."""
    response_lower = response.lower()
    return any(phrase in response_lower for phrase in CLARIFICATION_PHRASES)


async def test_conversation_context():
    """Test the conversation context fix with the exact failing scenario."""
    print("=" * 80)
    print("TESTING CONVERSATION CONTEXT FIX")
    print("Scenario: User asks about linear algebra, then follow-up questions")
    print("=" * 80)

    print("\nInitializing CourseManager...")
    cm = CourseManager()

    print("Creating workflow...")
    agent = create_workflow(cm)

    # Use unique session to ensure clean state
    session_id = f"test_context_{uuid.uuid4().hex[:8]}"
    student_id = "test_student_context"

    print(f"\nSession: {session_id}")
    print(f"Student: {student_id}")

    results = {"turn1": False, "turn2": False, "turn3": False}

    # TURN 1: Ask about linear algebra
    print("\n" + "-" * 40)
    print("TURN 1: User asks about linear algebra")
    print("-" * 40)
    query1 = "I want to learn linear algebra"
    print(f"User: {query1}")

    result1 = await run_agent_async(
        agent=agent,
        query=query1,
        session_id=session_id,
        student_id=student_id,
        enable_caching=False,
    )
    response1 = result1.get("final_response", "")
    print(f"\nAgent: {response1[:500]}")

    if "math022" in response1.lower() or "linear algebra" in response1.lower():
        print("\n✅ Turn 1 PASS: Agent mentioned linear algebra course")
        results["turn1"] = True
    else:
        print("\n❌ Turn 1 FAIL: Agent did not mention linear algebra course")

    # TURN 2: Ask about prerequisites for THIS course
    print("\n" + "-" * 40)
    print("TURN 2: User asks about prerequisites for THIS course")
    print("-" * 40)
    query2 = "What are the prerequisites for this course?"
    print(f"User: {query2}")

    result2 = await run_agent_async(
        agent=agent,
        query=query2,
        session_id=session_id,
        student_id=student_id,
        enable_caching=False,
    )
    response2 = result2.get("final_response", "")
    print(f"\nAgent: {response2[:500]}")

    if check_asked_clarification(response2):
        print('\n❌ Turn 2 FAIL: Agent asked for clarification instead of using context!')
        print('   The agent should have known "this course" = MATH022 from Turn 1')
    else:
        print("\n✅ Turn 2 PASS: Agent used conversation context correctly!")
        results["turn2"] = True

    # TURN 3: Ask for more details about IT
    print("\n" + "-" * 40)
    print("TURN 3: User asks for more details about IT")
    print("-" * 40)
    query3 = "Give me more details about it"
    print(f"User: {query3}")

    result3 = await run_agent_async(
        agent=agent,
        query=query3,
        session_id=session_id,
        student_id=student_id,
        enable_caching=False,
    )
    response3 = result3.get("final_response", "")
    print(f"\nAgent: {response3[:500]}")

    if check_asked_clarification(response3):
        print("\n❌ Turn 3 FAIL: Agent asked for clarification instead of using context!")
    else:
        print("\n✅ Turn 3 PASS: Agent used conversation context correctly!")
        results["turn3"] = True

    # Summary
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    passed = sum(results.values())
    total = len(results)
    print(f"Passed: {passed}/{total}")
    for turn, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"  {turn}: {status}")

    if all(results.values()):
        print("\n🎉 ALL TESTS PASSED! Conversation context fix is working.")
        return 0
    else:
        print("\n⚠️  Some tests failed. The conversation context fix needs more work.")
        return 1


if __name__ == "__main__":
    exit_code = asyncio.run(test_conversation_context())
    sys.exit(exit_code)


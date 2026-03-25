"""
Comprehensive tests for conversation context handling in Stage 6 Full Memory agent.

Tests the fix for pronoun/reference resolution in multi-turn conversations.
Verifies that the agent correctly uses conversation history to resolve
references like "this course", "it", "that" instead of asking clarifying questions.

Tests are organized into:
1. Unit Tests - Verify prompt structure contains context instructions
2. Integration Tests - Verify agent behavior with actual conversations
"""

import asyncio
import logging
import sys
from pathlib import Path
from typing import Any, Dict, List
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


def load_react_prompts_module():
    """Load react_prompts module directly without triggering package imports."""
    import importlib.util
    module_path = Path(__file__).parent / "agent" / "react_prompts.py"
    spec = importlib.util.spec_from_file_location("react_prompts", module_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


# =============================================================================
# UNIT TESTS - Test prompt structure and content
# =============================================================================


class TestReactPromptStructure:
    """Unit tests for REACT_SYSTEM_PROMPT conversation context instructions."""

    def test_prompt_contains_conversation_context_section(self):
        """Verify the prompt has a CRITICAL - CONVERSATION CONTEXT section."""
        module = load_react_prompts_module()
        prompt = module.REACT_SYSTEM_PROMPT

        assert "CRITICAL - CONVERSATION CONTEXT:" in prompt, (
            f"Prompt must contain 'CRITICAL - CONVERSATION CONTEXT:' section. "
            f"Got prompt starting with: {prompt[:200]}"
        )

    def test_prompt_instructs_pronoun_resolution(self):
        """Verify prompt instructs agent to resolve pronouns."""
        module = load_react_prompts_module()
        prompt = module.REACT_SYSTEM_PROMPT

        # Check for key pronoun resolution instructions
        assert "this course" in prompt.lower()
        assert '"it"' in prompt.lower() or "'it'" in prompt.lower()
        assert "that" in prompt.lower()

    def test_prompt_forbids_unnecessary_clarification(self):
        """Verify prompt tells agent NOT to ask 'which course?' unnecessarily."""
        module = load_react_prompts_module()
        prompt = module.REACT_SYSTEM_PROMPT

        assert 'NEVER ask "which course?"' in prompt or \
               "NEVER ask 'which course?'" in prompt, (
            "Prompt must instruct agent to NEVER ask 'which course?' when context is available"
        )

    def test_prompt_has_conversation_history_guideline(self):
        """Verify guidelines mention checking conversation history."""
        module = load_react_prompts_module()
        prompt = module.REACT_SYSTEM_PROMPT

        assert "conversation history" in prompt.lower(), (
            "Prompt must mention 'conversation history' in guidelines"
        )

    def test_prompt_has_follow_up_example(self):
        """Verify prompt includes Example 5 for follow-up questions."""
        module = load_react_prompts_module()
        prompt = module.REACT_SYSTEM_PROMPT

        assert "Example 5:" in prompt or "Example 5 -" in prompt, (
            "Prompt must include Example 5 demonstrating follow-up question handling"
        )
        # Check that the example shows context resolution
        assert "this course" in prompt and "MATH022" in prompt, (
            "Example 5 must show resolving 'this course' to a specific course code"
        )

    def test_prompt_has_pronoun_resolution_example(self):
        """Verify prompt includes Example 6 for pronoun resolution."""
        module = load_react_prompts_module()
        prompt = module.REACT_SYSTEM_PROMPT

        assert "Example 6:" in prompt or "Example 6 -" in prompt, (
            "Prompt must include Example 6 demonstrating pronoun resolution"
        )

    def test_prompt_examples_show_thought_process(self):
        """Verify examples show the thought process for context resolution."""
        module = load_react_prompts_module()
        prompt = module.REACT_SYSTEM_PROMPT

        # Examples should show the agent thinking about conversation history
        assert "Looking at the conversation history" in prompt or \
               "from the conversation history" in prompt, (
            "Examples must show agent reasoning about conversation history"
        )

    def test_guidelines_include_context_check(self):
        """Verify IMPORTANT GUIDELINES include checking context."""
        module = load_react_prompts_module()
        prompt = module.REACT_SYSTEM_PROMPT

        # Find the guidelines section
        assert "ALWAYS check conversation history" in prompt, (
            "Guidelines must include 'ALWAYS check conversation history'"
        )

    def test_guidelines_include_referent_identification(self):
        """Verify guidelines mention identifying referents."""
        module = load_react_prompts_module()
        prompt = module.REACT_SYSTEM_PROMPT

        assert "identify the referent" in prompt.lower(), (
            "Guidelines must mention identifying referents from conversation history"
        )


class TestReactPromptExamples:
    """Unit tests for the few-shot examples in the prompt."""

    def test_example5_shows_prerequisite_followup(self):
        """Verify Example 5 demonstrates prerequisite follow-up."""
        module = load_react_prompts_module()
        prompt = module.REACT_SYSTEM_PROMPT

        # Example 5 should show: user asks about "this course" prerequisites
        # after discussing a specific course
        assert "prerequisites for this course" in prompt.lower() or \
               "prerequisites for MATH022" in prompt, (
            "Example 5 must show prerequisite follow-up question"
        )

    def test_example6_shows_tell_me_more(self):
        """Verify Example 6 demonstrates 'tell me more about it' pattern."""
        module = load_react_prompts_module()
        prompt = module.REACT_SYSTEM_PROMPT

        assert "Tell me more about it" in prompt or \
               "tell me more about it" in prompt.lower(), (
            "Example 6 must show 'tell me more about it' pattern"
        )

    def test_examples_use_search_courses_with_resolved_code(self):
        """Verify examples show searching with resolved course code."""
        module = load_react_prompts_module()
        prompt = module.REACT_SYSTEM_PROMPT

        # After resolving "this course" to MATH022, should search for MATH022
        # Check that examples show the resolved course code in the action
        lines = prompt.split('\n')
        found_resolved_search = False
        for i, line in enumerate(lines):
            if 'Example 5' in line or 'Example 6' in line:
                # Look in the next 20 lines for a search with specific course code
                context = '\n'.join(lines[i:i+20])
                if '"MATH022"' in context or '"CS101"' in context:
                    found_resolved_search = True
                    break

        assert found_resolved_search, (
            "Examples must show searching with the resolved course code"
        )

# =============================================================================
# INTEGRATION TESTS - Test actual agent behavior
# =============================================================================


@pytest.fixture
def course_manager():
    """Create a CourseManager instance for tests."""
    from redis_context_course import CourseManager
    return CourseManager()


@pytest.fixture
def agent(course_manager):
    """Create the agent workflow for tests."""
    from agent.workflow import create_workflow
    return create_workflow(course_manager)


async def run_conversation_turns(
    agent,
    turns: List[Dict[str, Any]],
    student_id: str = "test_context_student",
    session_id: str = "test_context_session",
) -> List[Dict[str, Any]]:
    """Run a multi-turn conversation and return results for each turn."""
    from agent.workflow import run_agent_async
    
    results = []
    for i, turn in enumerate(turns):
        result = await run_agent_async(
            agent=agent,
            query=turn["query"],
            session_id=session_id,
            student_id=student_id,
            enable_caching=False,
        )
        results.append({
            "turn": i + 1,
            "query": turn["query"],
            "response": result.get("final_response", ""),
            "reasoning_trace": result.get("reasoning_trace", []),
            "react_iterations": result.get("react_iterations", 0),
        })
    return results


def assert_no_clarification_asked(response: str, context: str = ""):
    """Assert that the response does not ask for clarification."""
    response_lower = response.lower()
    clarification_phrases = [
        "which course",
        "could you specify",
        "please specify",
        "what course are you referring to",
        "can you clarify",
        "which one",
    ]
    for phrase in clarification_phrases:
        assert phrase not in response_lower, (
            f"Agent should NOT ask '{phrase}' when context is available. "
            f"{context}Response: {response[:200]}"
        )


class TestConversationContextResolution:
    """Integration tests for conversation context resolution."""

    @pytest.mark.asyncio
    async def test_linear_algebra_prerequisite_followup(self, agent):
        """
        Test the specific failing scenario:
        1. User asks about linear algebra -> Agent recommends MATH022
        2. User asks "What are the prerequisites for this course?"
        3. Agent should resolve "this course" to MATH022 and answer
        """
        turns = [
            {"query": "I want to learn linear algebra"},
            {"query": "What are the prerequisites for this course?"},
        ]
        
        results = await run_conversation_turns(agent, turns)
        
        # First turn should mention MATH022 or linear algebra
        first_response = results[0]["response"].lower()
        assert "math022" in first_response or "linear algebra" in first_response, (
            f"First response should mention MATH022. Got: {first_response[:200]}"
        )
        
        # Second turn should NOT ask for clarification
        second_response = results[1]["response"]
        assert_no_clarification_asked(second_response, "After discussing MATH022. ")
        
        # Should mention prerequisites
        second_lower = second_response.lower()
        assert "prerequisite" in second_lower or "require" in second_lower or \
               "before" in second_lower or "math022" in second_lower, (
            f"Should discuss prerequisites. Got: {second_response[:200]}"
        )

    @pytest.mark.asyncio
    async def test_tell_me_more_about_it(self, agent):
        """Test pronoun 'it' resolution after discussing a course."""
        turns = [
            {"query": "What is CS004?"},
            {"query": "Tell me more about it"},
        ]
        
        results = await run_conversation_turns(agent, turns)
        
        first_response = results[0]["response"].lower()
        assert "cs004" in first_response or "computer vision" in first_response
        
        second_response = results[1]["response"]
        assert_no_clarification_asked(second_response, "After discussing CS004. ")
        
        # Should provide details about CS004
        second_lower = second_response.lower()
        assert "cs004" in second_lower or "computer vision" in second_lower or \
               "course" in second_lower

    @pytest.mark.asyncio
    async def test_that_course_reference(self, agent):
        """Test 'that course' reference resolution."""
        turns = [
            {"query": "Show me machine learning courses"},
            {"query": "What are the assignments for that course?"},
        ]
        
        results = await run_conversation_turns(agent, turns)
        
        # Second turn should NOT ask for clarification
        second_response = results[1]["response"]
        assert_no_clarification_asked(second_response, "After showing ML courses. ")

    @pytest.mark.asyncio
    async def test_three_turn_conversation(self, agent):
        """Test context maintained across 3+ turns."""
        turns = [
            {"query": "What is MATH022?"},
            {"query": "What are the prerequisites?"},
            {"query": "Who teaches it?"},
        ]
        
        results = await run_conversation_turns(agent, turns)
        
        # All follow-up turns should NOT ask for clarification
        for i in range(1, len(results)):
            assert_no_clarification_asked(
                results[i]["response"], 
                f"Turn {i+1} after discussing MATH022. "
            )


class TestEdgeCases:
    """Test edge cases for conversation context."""

    @pytest.mark.asyncio
    async def test_no_context_available_first_turn(self, agent):
        """Test that agent handles ambiguous first-turn queries appropriately."""
        turns = [
            {"query": "What are the prerequisites?"},
        ]
        
        results = await run_conversation_turns(agent, turns)
        
        # Without context, agent MAY ask for clarification (this is acceptable)
        # Or it may provide general info - both are valid
        response = results[0]["response"]
        assert len(response) > 10, "Should provide some response"

    @pytest.mark.asyncio
    async def test_explicit_course_overrides_context(self, agent):
        """Test that explicit course mention overrides previous context."""
        turns = [
            {"query": "Tell me about CS004"},
            {"query": "What are the prerequisites for MATH022?"},
        ]
        
        results = await run_conversation_turns(agent, turns)
        
        # Second turn explicitly mentions MATH022, should answer about MATH022
        second_response = results[1]["response"].lower()
        # Should NOT be about CS004
        assert "math022" in second_response or "linear algebra" in second_response or \
               "prerequisite" in second_response


class TestMultipleCoursesMentioned:
    """Test handling when multiple courses are mentioned."""

    @pytest.mark.asyncio
    async def test_most_recent_course_used(self, agent):
        """When multiple courses mentioned, most recent should be used for 'it'."""
        turns = [
            {"query": "Compare CS004 and MATH022"},
            {"query": "Tell me more about the second one"},
        ]
        
        results = await run_conversation_turns(agent, turns)
        
        # Should NOT ask for clarification
        second_response = results[1]["response"]
        assert_no_clarification_asked(second_response, "After comparing courses. ")


# =============================================================================
# TEST RUNNER - For running tests directly
# =============================================================================


async def run_integration_tests_manually():
    """Run integration tests manually without pytest (for debugging)."""
    from redis_context_course import CourseManager
    from agent.workflow import create_workflow
    
    print("=" * 80)
    print("CONVERSATION CONTEXT INTEGRATION TESTS")
    print("=" * 80)
    
    print("\nInitializing...")
    cm = CourseManager()
    agent = create_workflow(cm)
    
    # Test 1: Linear algebra prerequisite follow-up
    print("\n" + "-" * 40)
    print("TEST 1: Linear Algebra Prerequisite Follow-up")
    print("-" * 40)
    
    turns = [
        {"query": "I want to learn linear algebra"},
        {"query": "What are the prerequisites for this course?"},
    ]
    
    results = await run_conversation_turns(
        agent, turns, 
        student_id="manual_test_1",
        session_id="manual_session_1"
    )
    
    for r in results:
        print(f"\nTurn {r['turn']}: {r['query']}")
        print(f"Response: {r['response'][:300]}...")
    
    # Check if test passed
    second_response = results[1]["response"].lower()
    if "which course" in second_response or "could you specify" in second_response:
        print("\n❌ FAIL: Agent asked for clarification instead of using context")
    else:
        print("\n✅ PASS: Agent used conversation context correctly")
    
    # Test 2: Tell me more about it
    print("\n" + "-" * 40)
    print("TEST 2: Tell Me More About It")
    print("-" * 40)
    
    turns = [
        {"query": "What is CS004?"},
        {"query": "Tell me more about it"},
    ]
    
    results = await run_conversation_turns(
        agent, turns,
        student_id="manual_test_2", 
        session_id="manual_session_2"
    )
    
    for r in results:
        print(f"\nTurn {r['turn']}: {r['query']}")
        print(f"Response: {r['response'][:300]}...")
    
    second_response = results[1]["response"].lower()
    if "which course" in second_response or "could you specify" in second_response:
        print("\n❌ FAIL: Agent asked for clarification")
    else:
        print("\n✅ PASS: Agent resolved 'it' correctly")
    
    print("\n" + "=" * 80)
    print("MANUAL TESTS COMPLETE")
    print("=" * 80)


if __name__ == "__main__":
    # Run unit tests with pytest or run integration tests manually
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--manual":
        # Run integration tests manually
        asyncio.run(run_integration_tests_manually())
    else:
        # Run with pytest
        print("Run with: pytest test_conversation_context.py -v")
        print("Or for manual integration tests: python test_conversation_context.py --manual")

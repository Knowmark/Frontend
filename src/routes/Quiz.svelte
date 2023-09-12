<script lang="ts">
  import { onMount } from "svelte";
  import { API_V1 } from "../lib/const";
  import { location, push } from "svelte-spa-router";
  import type { Quiz, QuizAnswers, ValidationResult } from "../lib/api";
  import { user } from "../lib/user";
  import { answer_defaults } from "../lib/wip";
  import QuizPartDisplay from "../components/QuizPartDisplay.svelte";
  import { fly } from "svelte/transition";

  export let params: Record<string, string>;

  let quiz: Quiz;
  let position: number = 0;

  $: onFinish = (quiz && quiz.parts.length == position) || false;
  $: current = quiz && quiz.parts[position];

  let results: ValidationResult | null = null;

  let answer_resp: QuizAnswers = {
    user: $user.id,
    answers: {},
  };

  $: answer =
    (answer_resp &&
      current &&
      "Question" in current &&
      answer_resp.answers[current.Question.id]) ||
    null;

  function submitAnswers() {
    API_V1.quizSubmitAnswers(quiz._id, answer_resp).then((resp) => {
      results = resp.data;
    });
  }

  onMount(async () => {
    quiz = (await API_V1.quizInfo(params["id"])).data;
    for (const part of quiz.parts) {
      if ("Question" in part) {
        answer_resp.answers[part.Question.id] = answer_defaults(
          part.Question.kind
        );
      }
    }
    console.log(answer_resp);
  });
</script>

<h1>Quiz</h1>

{#if results == null}
  <div class="current-question">
    {#if current}
      <div
        in:fly={{ x: 200, duration: 1000 }}
        out:fly={{ x: -200, duration: 1000 }}
      >
        <QuizPartDisplay data={current} bind:answer />
      </div>
    {/if}

    {#if onFinish}<p>That's all folks!</p>{/if}
  </div>

  {#if onFinish}
    <button on:click={submitAnswers}>Finish quiz</button>
  {:else}
    <button on:click={() => (position += 1)}>Next Question</button>
  {/if}
{:else}
  <p>
    Guessed answers: {results.correct_answers} / {results.total_questions}
  </p>
  <button on:click={() => push("/quiz")}>Go Back</button>
{/if}

<style lang="sass">
.current-question
    width: 100%
    overflow-x: hidden
</style>

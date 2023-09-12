<script lang="ts">
  import { push } from "svelte-spa-router";
  import type { QuizListResponse } from "../lib/api";
  import { user } from "../lib/user";

  export let data: QuizListResponse;

  $: can_delete = $user.id === data.author;

  function openQuiz(id: string) {
    return () => {
      push(`/quiz/${id}`);
    };
  }
</script>

<div class="result-card quiz" on:click={openQuiz(data.id)}>
  <h1>{data.name}</h1>
  <p>{data.desc || "No Description"}</p>
</div>

<style lang="sass">
.result-card
  background-color: var(--color-bg-elevated-1)
  margin: var(--gap-tiny)
  padding: var(--gap-small)
  border-radius: var(--gap-tiny)
  transition: transform 200ms ease-out
  user-select: none

  &:hover
    transform: scale(1.02)
</style>

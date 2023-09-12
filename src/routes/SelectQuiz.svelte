<script lang="ts">
  import { link } from "svelte-spa-router";
  import { Role } from "../lib/api";
  import { _ } from "../lib/i18n";
  import { user, type User } from "../lib/user";
  import { onMount } from "svelte";
  import { API_V1 } from "../lib/const";
  import QuizCard from "../components/QuizCard.svelte";

  var quizzes = [];

  onMount(async () => {
    quizzes = (await API_V1.quizList()).data;
  });
</script>

<div class="selection-view">
  <h1>{$_("nav.quizzes")}</h1>

  {#if $user && ($user.user_role === Role.Author || $user.user_role === Role.Admin)}
    <a href="/quiz/new" use:link class="button">{$_("action.create")}</a>
  {/if}

  <div class="card-list">
    {#each quizzes as quiz}
      <QuizCard data={quiz} />
    {/each}
  </div>
</div>

<style lang="sass">
.selection-view
  display: flex
  flex-direction: column
  gap: var(--gap-small)

.card-list
  display: flex
  flex-wrap: wrap
  :global(> *)
    width: 30%
</style>

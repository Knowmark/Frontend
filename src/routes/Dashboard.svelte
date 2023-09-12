<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "../lib/i18n";
  import { user } from "../lib/user";
  import QuizCard from "../components/QuizCard.svelte";
  import { API_V1 } from "../lib/const";

  var quizzes = [];
  let user_record = $user as any as Record<string, string>;

  onMount(async () => {
    quizzes = (await API_V1.quizList()).data;
  });
</script>

<h1>{$_("title.dashboard", { values: user_record })}</h1>
<p>Here's what's going on:</p>

<h2>Your classes</h2>
<div class="card-list classes">
  <div />
  <div />
  <div />
</div>
<h2>Upcomming quizzes</h2>

<div class="card-list">
  {#each quizzes as quiz}
    <QuizCard data={quiz} />
  {/each}
</div>

<style lang="sass">
  .card-list
    display: flex
    flex-wrap: wrap
    :global(> *)
      width: 30%
    
    &.classes > *
      background-color: var(--color-bg-elevated-1)
      border-radius: var(--gap-tiny)
      margin: var(--gap-small)
      height: 10rem
      width: 30%
</style>

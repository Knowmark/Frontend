<script lang="ts">
  import { onMount } from "svelte";
  import Snackbar from "../components/Snackbar.svelte";
  import type { Problem } from "../lib/api";
  import { API_V1 } from "../lib/const";
  import { _ } from "../lib/i18n";
  import { error } from "../lib/log";
  import { user } from "../lib/user";
  import { push } from "svelte-spa-router";

  let username = "";
  let password = "";

  let problem: Problem | null = null;

  function handleSignup(e: SubmitEvent) {
    e.preventDefault();
    /*
      {"id":"2dbbb237-d4d7-5c3c-9848-861c20d20c07","email":"tin.svagelj@live.com","username":"tinsvagelj","user_role":"Normal"}
      */
    API_V1.loginSubmit(password, username)
      .then((response) => {
        user.set(response.data);
      })
      .catch((err) => {
        if (err.response) {
          const response = err.response;
          if (response.status === 400) {
            // backend handles all issues
            // TODO: Backend should send localizable problems
            problem = response.data as unknown as Problem;
          }
        } else {
          error("Signup failed:", err);
        }
      });
  }

  $: if ($user) push("/");
</script>

<form on:submit={handleSignup}>
  <label for="username">{$_("form.username")}:</label>
  <input name="username" type="text" bind:value={username} required />
  <label for="username">{$_("form.password")}:</label>
  <input name="password" type="password" bind:value={password} required />

  <input type="submit" value={$_("action.login")} />
</form>

<Snackbar
  visible={!!problem}
  onHide={() => {
    problem = null;
  }}
  color="--color-error-hue"
>
  {#if problem}
    <div class="problem">
      <h3>{problem.title}</h3>
      <p>{problem.detail}</p>
    </div>
  {/if}
</Snackbar>

<style lang="sass">
  form
      display: grid
      column-gap: 1ch
      row-gap: 0.5ch
  
      width: 40ch
      margin: auto
      padding: 1.5ch
      border-radius: 1ch
  
      background: var(--color-bg-elevated)
      border: 2px solid var(--color-accent-400)
  
      input[type="submit"]
          width: min-content
          margin-left: auto
  
  .problem
      h3
          color: var(--color-error-300)
      p
          color: var(--color-error-100)

</style>

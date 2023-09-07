<script lang="ts">
  import Router, { link, location, push } from "svelte-spa-router";
  import routes, { nav_items } from "./routes";

  import { _ } from "./lib/i18n";

  import Navigation from "./components/Navigation.svelte";
  import { logout, user } from "./lib/user";
</script>

{#if $nav_items.length > 0}
  <Navigation />
{:else}
  <span />
{/if}
<main>
  {#if !$location.startsWith("/login") && !$location.startsWith("/signup")}
    <div class="login-bar">
      {#if $user}
        <button on:click={logout}>{$_("action.signout")}</button>
      {:else}
        <button on:click={() => push("/login")}>{$_("action.login")}</button>
        <button on:click={() => push("/signup")}>{$_("action.signup")}</button>
      {/if}
    </div>
  {/if}
  <Router routes={$routes} />
</main>

<style lang="sass">
main
  display: flex
  flex-direction: column

  padding: 1ch 2ch
  background: var(--color-bg)
  color: var(--color-fg)

  height: 100vh
  overflow-y: scroll

.login-bar
  display: flex
  justify-content: end
  gap: 1ch
  padding-top: 0.5ch
  padding-right: 0.5ch

</style>

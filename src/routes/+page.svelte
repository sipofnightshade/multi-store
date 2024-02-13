<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { Auth } from '@supabase/auth-ui-svelte';
  import { ThemeSupa } from '@supabase/auth-ui-shared';

  export let data;

  let { supabase, url } = data;
  $: ({ supabase, url } = data);
</script>

<svelte:head>
  <title>User Management</title>
</svelte:head>

<div class="flex flex-col">
  <div class="form-widget">
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      redirectTo={`${url}/auth/callback`}
      showLinks={false}
      appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
    />
  </div>
  <form method="POST" class="p-2">
    <button class="rounded bg-green-500 px-4 py-2" formaction="?/signin&provider=github"
      >Github</button
    >
  </form>
</div>

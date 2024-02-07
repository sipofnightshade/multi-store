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

<div class="flex">
  <div class="form-widget">
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      redirectTo={`${url}/auth/callback`}
      showLinks={false}
      appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
    />
  </div>
</div>

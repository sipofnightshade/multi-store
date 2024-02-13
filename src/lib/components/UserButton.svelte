<script lang="ts">
  import { enhance } from '$app/forms';
  import * as Avatar from '$lib/components/ui/avatar';
  import type { SubmitFunction } from '@sveltejs/kit';

  let loading = false;

  const handleSignOut: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      update();
    };
  };
</script>

<Avatar.Root class="h-16 w-16">
  <Avatar.Image src="https://github.com/sipofnightshade.png" alt="profile thumbnail" />
  <Avatar.Fallback>CN</Avatar.Fallback>
</Avatar.Root>

<form method="post" action="/account?/signout" use:enhance={handleSignOut}>
  <div>
    <button class="rounded bg-cyan-400 px-4 py-2 text-slate-800" disabled={loading}>
      {loading ? 'Loading...' : 'Sign Out'}
    </button>
  </div>
</form>

<!-- src/routes/account/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import { superForm } from 'sveltekit-superforms';
  // components
  import * as Avatar from '$lib/components/ui/avatar';
  import { Button } from '$lib/components/ui/button';
  import SuperDebug from 'sveltekit-superforms';
  //types
  import type { SubmitFunction } from '@sveltejs/kit';

  export let data;

  const { form } = superForm(data.form);

  let { session, supabase } = data;
  $: ({ session, supabase } = data);

  let profileForm: HTMLFormElement;
  let loading = false;

  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async () => {
      loading = false;
    };
  };

  const handleSignOut: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      update();
    };
  };
</script>

<!-- <SuperDebug data={$form} /> -->
<div
  class="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 p-8 text-slate-200 shadow-xl shadow-slate-900"
>
  <form
    class="flex w-full flex-col items-center gap-4"
    method="post"
    action="?/update"
    use:enhance={handleSubmit}
    bind:this={profileForm}
  >
    <Avatar.Root class="h-32 w-32">
      <Avatar.Image src={$form.avatar_url} alt="@shadcn" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>

    <div class="flex w-full flex-col">
      <label for="email">Email</label>
      <input
        class="mt-1.5 rounded-md border-2 border-slate-700 bg-slate-700 p-2"
        id="email"
        type="text"
        value={session.user.email}
        disabled
      />
    </div>

    <div class="flex w-full flex-col">
      <label for="full_name">Full Name</label>
      <input
        class="mt-1.5 rounded-md border border-slate-600 bg-slate-800 p-2"
        id="full_name"
        name="full_name"
        type="text"
        value={$form.full_name}
      />
    </div>

    <div class="flex w-full flex-col">
      <label for="username">Username</label>
      <input
        class="mt-1.5 rounded-md border border-slate-600 bg-slate-800 p-2"
        id="username"
        name="username"
        type="text"
        value={$form.username}
      />
    </div>

    <div class="flex w-full flex-col">
      <label for="website">Website</label>
      <input
        class="mt-1.5 rounded-md border border-slate-600 bg-slate-800 p-2"
        id="website"
        name="website"
        type="url"
        value={$form.website}
      />
    </div>

    <Button class="h-11 w-full" type="submit" variant="secondary" disabled={loading}>
      {loading ? 'Loading...' : 'Update'}
    </Button>
  </form>

  <form class="mt-2" method="post" action="?/signout" use:enhance={handleSignOut}>
    <Button
      class="h-11 w-full border-red-600 bg-red-800 hover:bg-red-700 hover:text-slate-100"
      type="submit"
      variant="outline"
      disabled={loading}>Sign Out</Button
    >
  </form>
</div>

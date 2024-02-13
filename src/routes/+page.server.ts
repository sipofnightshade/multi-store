// src/routes/+page.server.ts
import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Provider } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
  const session = await getSession();

  // if the user is already logged in return them to the account page
  if (session) {
    throw redirect(303, '/account');
  }

  return { url: url.origin };
};

export const actions: Actions = {
  signin: async ({ url, locals: { supabase } }) => {
    const provider = url.searchParams.get('provider') as Provider;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${url.origin}/auth/callback/`
      }
    });

    if (error) {
      return fail(500, { message: 'Server error. Try again later.', success: false });
    }

    throw redirect(303, data?.url);
  }
};

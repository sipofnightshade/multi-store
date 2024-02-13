import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

// zod schemas
const userSchema = z.object({
  username: z.string(),
  full_name: z.string(),
  website: z.string(),
  avatar_url: z.string()
});

const editUserSchema = userSchema.extend({
  avatar_url: userSchema.shape.avatar_url.optional()
});

export const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, '/');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(`username, full_name, website, avatar_url`)
    .eq('id', session.user.id)
    .single();

  const form = await superValidate(profile, zod(userSchema));

  return { session, form };
};

export const actions = {
  update: async ({ request, locals: { supabase, getSession } }) => {
    const form = await superValidate(request, zod(editUserSchema));

    const session = await getSession();

    const { error } = await supabase.from('profiles').upsert({
      id: session?.user.id,
      full_name: form.data.full_name,
      username: form.data.username,
      website: form.data.website,
      updated_at: new Date()
    });

    if (!form.valid) {
      return fail(400, { form });
    }

    if (error) {
      return fail(500, { form });
    }

    return { form };
  },

  signout: async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (session) {
      await supabase.auth.signOut();
      throw redirect(303, '/');
    }
  }
};

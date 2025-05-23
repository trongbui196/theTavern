import { supabase } from '../../supabase/supabase';

export const loginWithEmail = async (username: string, password: string) => {
  // Step 1: Get email from username
  const { data: userdata, error: profileError } = await supabase
    .from('profiles')
    .select('email')
    .eq('username', username)
    .single(); // Use .single() if username is unique

  if (profileError) throw profileError;
  if (!userdata) throw new Error('No user found with that username');

  // Step 2: Sign in with email + password
  const { data, error: authError } = await supabase.auth.signInWithPassword({
    email: userdata.email,
    password,
  });

  if (authError) throw authError;
  return data.user;
};

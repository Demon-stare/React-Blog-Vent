import * as React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [aboutme, setaboutme] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { user } = session;

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, aboutme`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setaboutme(data.aboutme);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { user } = session;

      const updates = {
        id: user.id,
        username,
        aboutme,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="After login">
      {loading ? (
        'Saving ...'
      ) : (
        <form onSubmit={updateProfile} className="form-widget">
          <div>Your Email: {session.user.email}</div>
          <div>
            <label htmlFor="username">Name</label>
            <input
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="aboutme">aboutme</label>
            <input
              id="aboutme"
              type="text"
              value={aboutme || ''}
              onChange={(e) => setaboutme(e.target.value)}
            />
          </div>
          <div>
            <button className="button primary block" disabled={loading}>
              Update profile
            </button>
          </div>
        </form>
      )}

      <button type="button" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
  );
};

export default Account;

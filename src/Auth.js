import * as React from 'react';
import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="header">
      <h1>Welcome to Vent 🌬</h1>
      {loading ? (
        'Sending link...'
      ) : (
        <form onSubmit={handleLogin}>
          <br />
          <input
            id="email"
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button id="Send_Link_Button">Send link</button>
        </form>
      )}
    </div>
  );
}

import './style.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Account from './Account';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <div className="container">{!session ? <Auth /> : <Feed />}</div>;
}

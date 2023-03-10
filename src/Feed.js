import React from 'react';
import './style.css';
import { supabase } from './supabaseClient';
import { createClient } from '@supabase/supabase-js';

let PostsData = null;

async function start() {
  const { data, error } = await supabase.from('Posts').select();
  PostsData = data;
}

export default function Feed() {
  createClient();
  start();

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen{PostsData}</p>
    </div>
  );
}

import * as React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const Feed = () => {
  const getPosts = async () => {
    try {
      setLoading(true);
      const Posts = await supabase.from('Posts').select();
      console.log(Posts);

      if (error !== 406) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  getPosts();

  return <div id="Home"> <h1>Hey {supabase.from('profiles').select('username').single()}</h1> </div>;
};

export default Feed;

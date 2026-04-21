import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';

export function usePayment() {
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkStatus() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsPaid(false);
          setLoading(false);
          return;
        }

        const res = await fetch('http://localhost:4000/api/user/status', {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setIsPaid(data.isPaid);
        } else {
          setIsPaid(false);
        }
      } catch (e) {
        console.error("Failed to check status", e);
        setIsPaid(false);
      } finally {
        setLoading(false);
      }
    }

    checkStatus();

    // Listen to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      checkStatus();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { isPaid, loading };
}

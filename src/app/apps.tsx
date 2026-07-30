import { useEffect } from 'react';
import { router } from 'expo-router';

export default function AppsRedirect() {
  useEffect(() => {
    router.replace('/shortcuts' as any);
  }, []);
  return null;
}

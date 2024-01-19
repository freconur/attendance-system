import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase/firebaseConfig';

interface Props {
  children:JSX.Element | JSX.Element[]
}
const PrivateRoutes = ({ children }:Props) => {
  const auth = getAuth(app)
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });
  }, []);
  
  return <>{children}</>;
};

export default PrivateRoutes;
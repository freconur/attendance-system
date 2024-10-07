import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase/firebaseConfig';
import { useGlobalContext } from '@/features/context/GlobalContext';

interface Props {
  children: JSX.Element | JSX.Element[]
}
const PrivateRoutes = ({ children }: Props) => {
  const auth = getAuth(app)
  const router = useRouter();
  const { userData } = useGlobalContext()
  // console.log('aver si es cierto', userData)
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
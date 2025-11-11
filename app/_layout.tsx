import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigationState } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Linking from 'expo-linking';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [loaded, error] = useFonts({
    HS: require('../assets/fonts/HappySchool.ttf'),
    ...FontAwesome.font,
  });



  function useCurrentRouteName() {
    const navState = useNavigationState((state) => state);

    function getRouteName(state) {
      if (!state || !state.routes || typeof state.index !== 'number') return undefined;
      const route = state.routes[state.index];
      if (route.state) return getRouteName(route.state);
      return route.name;
    }

    return getRouteName(navState);
  }

  const currentRoute = useCurrentRouteName();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const lockOrientation = async () => {
      if (currentRoute === 'index') {
        await ScreenOrientation.unlockAsync();
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      } else {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
    };

    lockOrientation();
  }, [currentRoute]);

  useEffect(() => {
    const handleDeepLink = (url: string | null) => {
      if (!url || (globalThis as any).__deeplinkRedirected) return;

      (globalThis as any).__deeplinkRedirected = true;
      router.replace('/');
    };

    Linking.getInitialURL().then(handleDeepLink);
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="shop" options={{ headerShown: false }} />
      <Stack.Screen name="game" options={{ headerShown: false }} />
    </Stack>
  );
}

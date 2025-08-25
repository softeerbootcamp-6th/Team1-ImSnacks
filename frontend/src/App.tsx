import { Router } from './routes/Router';
import GlobalStyles from './layouts/GlobalStyles';
import { useWeatherConditionStore } from './store/useWeatherConditionStore';
import { ThemeProvider } from '@emotion/react';
import { createThemeAssets } from './styles/createThemeAssets';
import { weatherToTheme } from './styles/weatherTheme';
import { useInitialAppData } from './hooks/useInitialAppData';
import { useIsMobileStore } from './store/useIsMobileStore';
import { useEffect } from 'react';

function App() {
  const { weatherCondition } = useWeatherConditionStore();
  const weatherTheme = createThemeAssets(weatherToTheme[weatherCondition]);
  useInitialAppData();

  const { setIsMobile } = useIsMobileStore();

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    setIsMobile(isMobile);
  }, [setIsMobile]);

  return (
    <ThemeProvider theme={weatherTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}

export default App;

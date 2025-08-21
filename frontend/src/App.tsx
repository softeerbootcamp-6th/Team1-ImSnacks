import { Router } from './routes/Router';
import GlobalStyles from './styles/GlobalStyles';
import { useWeatherConditionStore } from './store/useWeatherConditionStore';
import { ThemeProvider } from '@emotion/react';
import { createThemeAssets } from './styles/createThemeAssets';
import { weatherToTheme } from './utils/weatherToTheme';
import { useInitialAppData } from './hooks/useInitialAppData';

function App() {
  const { weatherCondition } = useWeatherConditionStore();
  const weatherTheme = createThemeAssets(weatherToTheme[weatherCondition]);
  useInitialAppData();

  return (
    <ThemeProvider theme={weatherTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}

export default App;

import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, View, Text } from 'react-native'
import CustomTextInput from './components/customTextInput';
import WeatherInfo from './components/weatherInfo';
import WeatherSearch from './components/weatherSearch';
import axios from 'axios';
import { BASE_URL, API_KEY } from './constant';
import {  useState } from "react";

export default function App() {
  const [weatherData, setWeatherData] = useState()
  const [status, setStatus] = useState('')
  
  function handleSearch (location){
    axios
    .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
    .then((response) => {
      const data = response.data
      data.visibility /= 1000
      data.visibility = data.visibility.toFixed(2)
      data.main.temp -= 273.15 
      data.main.temp = data.main.temp.toFixed(2)
      setWeatherData(data)
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return (
    <View style={styles.container}>
      <WeatherSearch
      searchWeather={handleSearch}
      
      />
      <WeatherInfo
        name={weatherData?.name}
        temp={weatherData?.main?.temp}
        weatherDesc={weatherData?.weather[0]?.description}
        icon={weatherData?.weather[0]?.icon}
        visibility={weatherData?.visibility}
        windSpeed={weatherData?.wind.speed}
      />
      
      <StatusBar style="auto" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

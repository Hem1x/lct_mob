import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Profile from '../components/Profile';
import { useGetAnalyzeQuery } from '../store/api/api';
import { useAppSelector } from '../store/hook';
import { MaterialIcons } from '@expo/vector-icons';

const Analytics = () => {
  const { data, isLoading, isError } = useGetAnalyzeQuery(null);
  const { user } = useAppSelector((state) => state.auth);

  const analyzeData =
    user !== 'admin' && data
      ? data.worker_analitika.filter((worker) => worker.fio === user)[0]
      : null;

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={{ width: 110, height: 15 }}
            resizeMode="contain"
            source={require('../assets/logo.png')}
          />
          <Text style={styles.title}>профиль</Text>
        </View>
        {data && <Profile analyzeData={analyzeData} />}
        {isLoading && <ActivityIndicator size={'large'} />}
        {isError && (
          <View style={{ marginTop: 100 }}>
            <MaterialIcons
              style={{ textAlign: 'center', marginBottom: 10 }}
              name="error-outline"
              size={24}
              color="red"
            />
            <Text
              style={{
                textAlign: 'center',
                color: 'red',
              }}>
              Ошибка загрузки
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 23,
    paddingTop: 50,
  },
  title: {
    fontWeight: '800',
    fontSize: 34,
    marginBottom: 30,
  },
});

export default Analytics;

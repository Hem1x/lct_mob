import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../store/hook';
import { login } from '../store/features/authSlice';
import { useLazyGetAuthQuery } from '../store/api/api';

const Login = () => {
  const [fio, setFio] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const [errMessage, setErrMessage] = useState('');
  const [trigger] = useLazyGetAuthQuery();

  const handleLogin = async (e: GestureResponderEvent) => {
    e.preventDefault();
    const response = await trigger({ fio, password });
    if (response.error) {
      setErrMessage('Ошибка при авторизации');
    } else if (response.data.auth === 'success') {
      dispatch(login(fio));
      setErrMessage('');
    } else if (response.data.auth === 'admin') {
      setErrMessage('у вас нет прав администратора');
    } else if (response.data.auth === 'login') {
      setErrMessage('неверный логин или пароль');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Вход в аккаунт</Text>

      <View style={{ width: '100%', gap: 20, marginBottom: 60 }}>
        <TextInput
          style={styles.input}
          placeholder="ФИО"
          value={fio}
          onChangeText={(text) => setFio(text)}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Пароль"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {errMessage.length !== 0 && (
          <Text style={{ color: 'red', fontWeight: '300', fontSize: 12 }}>
            {errMessage}
          </Text>
        )}
      </View>

      {false ? (
        <ActivityIndicator color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Войти</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 33,
  },
  title: {
    fontSize: 20,
    color: '#0066FF',
    fontWeight: '900',
    marginBottom: 50,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ACACAC',
    width: '100%',
    paddingBottom: 10,
    paddingLeft: 8,
  },
  btn: {
    backgroundColor: '#0066FF',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 16,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Login;

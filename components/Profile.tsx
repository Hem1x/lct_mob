import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { AnalitikaAdmin, WorkerAnalitika } from '../types/analyze';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { Task } from '../types/responseTask';
import { graidTable } from '../utils/taskManager';
import { logout } from '../store/features/authSlice';

const ProfileInfo: React.FC = () => {
  const { user, address, graid } = useAppSelector((state) => state.auth);

  return (
    <View style={styles.profileInfoContainer}>
      <Image
        style={{ width: 35, height: 35, borderRadius: 9999 }}
        resizeMode="cover"
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo23tYn4lKpHQfnMMHNWcf3pSMyg3wNQrJT2yFJSHA&s',
        }}
        alt="icon"
      />
      <View style={{ gap: 2 }}>
        <Text style={{ fontWeight: '600' }}>
          {user ? user.split(' ').slice(0, 2).join(' ') : 'Неизвестно'}
        </Text>
        <Text style={{ color: '#939393' }}>{address ? address : 'неизвестно'}</Text>
      </View>
      <View
        style={{
          backgroundColor: '#FFF1D9',
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 4,
          alignSelf: 'flex-end',
          marginLeft: 10,
        }}>
        <Text>{graid ? graidTable[+graid - 1] : 'неизвестно'}</Text>
      </View>
    </View>
  );
};

const ProfileTask = ({ task }: { task: Task }) => {
  return (
    <View>
      <Text style={{ fontSize: 13, marginBottom: 5 }}>{task.name}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 12, color: '#939393' }}>
          {task.time_start.replace('.', ':')} - {task.time_finish.replace('.', ':')}
        </Text>
        <Text style={{ color: '#939393' }}>{'  •  '}</Text>
        <View>
          <Text style={{ fontSize: 12, color: '#939393', maxWidth: 201 }}>
            {task.address}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ProfileTasks = ({ analyzeData }: { analyzeData: WorkerAnalitika | null }) => {
  const tasks = useAppSelector((state) => state.auth.tasks);

  return (
    <View style={styles.profileTasksContainer}>
      <Text style={{ fontWeight: '600', fontSize: 18, marginBottom: 16 }}>
        задачи на сегодня
      </Text>
      <View
        style={{
          backgroundColor: '#F4F4F4',
          flexDirection: 'row',
          marginBottom: 12,
          padding: 12,
          paddingLeft: 24,
          borderRadius: 16,
          gap: 24,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            {analyzeData?.quantity_tasks}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#939393' }}>
            задачи
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            ~ {Math.round(analyzeData?.total_time_tasks ?? 0)}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#939393' }}>
            рабочих часов
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: '#939393',
          fontWeight: '600',
          fontSize: 16,
          marginBottom: 14,
        }}>
        ближайшшие задачи
      </Text>
      <View style={{ gap: 30 }}>
        {tasks ? (
          tasks.map((task) => <ProfileTask task={task} key={task.id} />)
        ) : (
          <Text>Нет данных</Text>
        )}
      </View>
    </View>
  );
};

interface ProfileProps {
  analyzeData: WorkerAnalitika | null;
}

const Profile: React.FC<ProfileProps> = ({ analyzeData }) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <ProfileInfo />
      <ProfileTasks analyzeData={analyzeData} />
      <TouchableOpacity
        onPress={() => dispatch(logout())}
        style={{
          marginVertical: 40,
          paddingVertical: 15,
          width: '100%',
          backgroundColor: '#fddecf',
          borderRadius: 10,
        }}>
        <Text style={{ textAlign: 'center', color: 'red' }}>Выйти из аккаунта</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 25,
  },
  profileTasksContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    padding: 16,
  },
});

export default Profile;

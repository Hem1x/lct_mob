import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import GoogleMap from '../components/GoogleMap';
import TaskDetailInfo from '../components/TaskDetailInfo';
import { Task } from '../types/responseTask';
import { statusColor, statusTable } from '../utils/statusColor';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { convertStringToCoord } from '../utils/taskManager';
import { useChangeStatusMutation } from '../store/api/api';

const TaskDetail = () => {
  const { params } = useRoute();
  const [changeStateStatus, { isError }] = useChangeStatusMutation();

  if (!params || typeof params !== 'object' || !('details' in params)) {
    return;
  }
  const details: Task = (params.details as Task) ?? [];
  const navigation = useNavigation();

  const route = {
    start: convertStringToCoord(details.coordinates_start),
    finish: convertStringToCoord(details.coordinates_finish),
  };

  const handleUpdateStatus = async (taskId: Task['id'], status: Task['status']) => {
    await changeStateStatus({
      taskId,
      status,
    }).unwrap();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(CommonActions.goBack())}>
            <AntDesign name="close" size={24} color="#939393" />
          </TouchableOpacity>
          <Text
            style={{
              color: statusColor(statusTable[details.status]).text,
              fontWeight: '600',
            }}>
            {statusTable[details.status]}
          </Text>
        </View>
        <GoogleMap
          finish={details.address}
          time={12}
          route={{
            start: route.start as [number, number],
            finish: route.finish as [number, number],
          }}
        />
        <TaskDetailInfo details={details} />
      </ScrollView>

      {statusTable[details.status] === 'в работе' && (
        <TouchableOpacity
          onPress={() => handleUpdateStatus(details.id, 2)}
          style={[styles.completedBtn, { backgroundColor: '#52bd6c' }]}>
          <Text style={styles.completedBtnText}>выполнено</Text>
        </TouchableOpacity>
      )}

      {statusTable[details.status] === 'не начато' && (
        <TouchableOpacity
          onPress={() => handleUpdateStatus(details.id, 1)}
          style={[styles.completedBtn, { backgroundColor: '#FFB940' }]}>
          <Text style={styles.completedBtnText}>взять в работу</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    maxWidth: 240,
  },
  header: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 25,
    paddingHorizontal: 23,
  },
  completedBtn: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#52bd6c',
    paddingVertical: 16,
  },
  completedBtnText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
});

export default TaskDetail;

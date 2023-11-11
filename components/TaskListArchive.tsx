import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Task } from '../types/responseTask';
import { statusTable } from '../utils/statusColor';

interface TaskListArchiveProps {
  taskList: Task[];
}

const TaskListArchive: React.FC<TaskListArchiveProps> = ({ taskList }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>архив задач</Text>
      {taskList.filter((task) => task.status === 2).length === 0 && (
        <View>
          <Text
            style={{
              fontWeight: '300',
              fontSize: 13,
              color: '#939393',
              textAlign: 'center',
            }}>
            Нет завершённых задач
          </Text>
        </View>
      )}
      {taskList
        .filter((task) => task.status === 2)
        .map((task, index) => {
          return (
            <View key={task.id}>
              <TouchableOpacity
                style={styles.task}
                onPress={() =>
                  navigation.dispatch(
                    CommonActions.navigate('TaskDetail', { details: task }),
                  )
                }>
                <View style={{ gap: 6 }}>
                  <Text style={styles.taskTitle}>{task.name}</Text>
                  <Text style={{ color: '#939393' }}>{task.address}</Text>
                  <Text style={styles.taskStatus}>{statusTable[task.status]}</Text>
                </View>

                <MaterialIcons name="navigate-next" size={24} color="#939393" />
              </TouchableOpacity>
              <View style={styles.separator} />
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    color: '#939393',
    fontSize: 16,
    marginBottom: 27,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  taskStatus: {
    color: '#85DD9B',
  },
  taskDate: {
    color: '#939393',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 20,
  },
});

export default TaskListArchive;

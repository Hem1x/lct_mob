import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { statusColor, statusTable } from '../utils/statusColor';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Task } from '../types/responseTask';
import { priorityTable } from '../utils/taskManager';

interface TaskDetailInfoProps {
  details: Task;
}

const TaskDetailInfo: React.FC<TaskDetailInfoProps> = ({ details }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.detailsBlock}>
      <Text style={styles.title}>{details.name}</Text>
      {/* -------------------------- */}

      {/* --------------------------- */}
      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontWeight: '500', marginBottom: 5 }}>адрес</Text>
        <Text>{details.address}</Text>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontWeight: '500', marginBottom: 5 }}>приоритет</Text>
        <Text>{priorityTable[+details.priority - 1]}</Text>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontWeight: '500', marginBottom: 5 }}>время пути</Text>
        <Text>{details.route_time} мин</Text>
      </View>
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#c7c6c6',
          marginVertical: 3,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',

          marginVertical: 15,
        }}>
        <View style={{ flex: 0.4 }}>
          <Text style={{ textAlign: 'center', fontSize: 25 }}>
            {details.time_start.replace('.', ':')}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              textAlign: 'center',
              color: '#939393',
            }}>
            cтарт
          </Text>
        </View>

        <Ionicons
          style={{ flex: 0.2, textAlign: 'center' }}
          name="time-outline"
          size={30}
          color="black"
        />
        <View style={{ flex: 0.4 }}>
          <Text style={{ textAlign: 'center', fontSize: 25 }}>
            {details.time_finish.replace('.', ':')}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              textAlign: 'center',
              color: '#939393',
            }}>
            окончание
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsBlock: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    lineHeight: 25,
  },
  header: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 25,
  },
});

export default TaskDetailInfo;

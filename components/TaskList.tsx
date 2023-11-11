import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { statusColor, statusTable } from '../utils/statusColor';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Task } from '../types/responseTask';

interface TaskListProps {
  taskList: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ taskList }) => {
  const navigation = useNavigation();
  console.log(taskList.map((task) => task.status));

  return (
    <View style={{ elevation: 10, marginBottom: 15 }}>
      <FlatList
        horizontal
        data={taskList.filter((task) => task.status !== 2)}
        ListEmptyComponent={<View></View>}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate('TaskDetail', {
                  details: item,
                }),
              )
            }
            style={[
              styles.taskBlock,
              {
                marginLeft: index === 0 ? 25 : 0,
                marginRight: index === taskList.length - 1 ? 25 : 0,
              },
            ]}>
            <View style={styles.badgeBar}>
              {item.priority === '3' && (
                <View>
                  <Text
                    style={[
                      styles.badge,
                      { backgroundColor: '#E8EBFF', fontSize: 12 },
                    ]}>
                    высокий приоритет
                  </Text>
                </View>
              )}
              <View
                style={[
                  styles.badge,
                  { backgroundColor: statusColor(statusTable[item.status]).bg },
                ]}>
                <Text style={{ fontSize: 12 }}>{statusTable[item.status]}</Text>
              </View>
            </View>

            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.date}>
              c {item.time_start.replace('.', ':')} до{' '}
              {item.time_finish.replace('.', ':')}{' '}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskBlock: {
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    padding: 16,
    paddingRight: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 30,
    maxWidth: 250,
  },
  badgeBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  date: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    fontSize: 12,
    color: '#a1a1a1',
  },
});

export default TaskList;

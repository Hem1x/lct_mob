import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';

interface TaskTypeListProps {
  taskTypeList: {
    text: string;
    value: number;
    color: string;
  }[];
}

const TaskTypeList: React.FC<TaskTypeListProps> = ({ taskTypeList }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={taskTypeList}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.text}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.typeTask,
              {
                backgroundColor: item.color,
                marginLeft: index === 0 ? 25 : 0,
                marginRight: index === taskTypeList.length - 1 ? 25 : 0,
              },
            ]}>
            <Text>
              {item.text}{' '}
              <Text style={{ fontWeight: '700' }}>{item.value}</Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  typeTask: {
    paddingVertical: 4,
    paddingHorizontal: 18,
    borderRadius: 16,
  },
});

export default TaskTypeList;

import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TaskTypeList from '../components/TaskTypeList';
import TaskList from '../components/TaskList';
import TaskListArchive from '../components/TaskListArchive';
import { useGetUsersQuery } from '../store/api/api';
import { Task } from '../types/responseTask';
import { flattenNestedLists } from '../utils/flatten';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { setUserData } from '../store/features/authSlice';

const TaskManager = () => {
  const { data, isLoading, isError, refetch } = useGetUsersQuery(null);
  const userFIO = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);

  const normalizedData: Task[] = data
    ? flattenNestedLists(
        data.map((obj) => {
          const tasks = obj.tasks.map((task) => ({ ...task, worker: obj.worker }));

          return tasks;
        }),
      )
    : [];

  const taskList = normalizedData?.filter((task) => task.fio === userFIO);

  const taskTypeList = [
    {
      text: 'задач на сегодня:',
      value: taskList.filter((task) => task.status !== 2).length,
      color: '#FFF1D9',
    },
    {
      text: 'высокий приоритет:',
      value: taskList.filter((task) => task.priority === '3' && task.status !== 2)
        .length,
      color: '#FFE6DE',
    },
  ];

  useEffect(() => {
    if (data) {
      dispatch(
        setUserData({
          graid: taskList[0].worker.graid,
          address: taskList[0].worker.address,
          tasks: taskList,
        }),
      );
    }
  }, [data]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Image
            style={{ width: 110, height: 15 }}
            resizeMode="contain"
            source={require('../assets/logo.png')}
          />
          <Text style={styles.title}>мои задачи</Text>
        </View>
        <TaskTypeList taskTypeList={taskTypeList} />
        <TaskList taskList={taskList} />
        <TaskListArchive taskList={taskList} />
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

export default TaskManager;

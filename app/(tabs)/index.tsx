
import { Colors } from '@/constants/Colors';
import { Task, useTaskContext } from '@/contexts/TaskContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function TaskManagerScreen() {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const { tasks, addTask, toggleTask, deleteTask, getStats } = useTaskContext();
  const { completedTasks, totalTasks } = getStats();

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    addTask(newTaskTitle, newTaskDescription);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setShowDescriptionInput(false);
  };

  const handleDeleteTask = (taskId: string) => {
    if (Platform.OS === 'web') {
      // Use custom confirmation for web
      setTaskToDelete(taskId);
      setShowDeleteConfirm(true);
    } else {
      // Use native Alert for mobile
      Alert.alert(
        'Delete Task',
        'Are you sure you want to delete this task?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              deleteTask(taskId);
            },
          },
        ]
      );
    }
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
    setShowDeleteConfirm(false);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={[
      styles.taskItem,
      { backgroundColor: colors.card, borderColor: colors.border }
    ]}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => toggleTask(item.id)}
        activeOpacity={0.7}
      >
        <View style={[
          styles.checkbox,
          { borderColor: colors.primary },
          item.completed && { backgroundColor: colors.primary }
        ]}>
          {item.completed && (
            <Ionicons name="checkmark" size={16} color={colors.textLight} />
          )}
        </View>
        <View style={styles.taskTextContainer}>
          <Text style={[
            styles.taskTitle,
            { color: colors.text },
            item.completed && styles.completedTaskText
          ]}>
            {item.title}
          </Text>
          {item.description && (
            <Text style={[
              styles.taskDescription,
              { color: colors.textSecondary },
              item.completed && styles.completedTaskText
            ]}>
              {item.description}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTask(item.id)}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="trash-outline" size={20} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.highlight }]}>Task Manager</Text>
              <Text style={[styles.subtitle, { color: colors.highlight }]}>
                {completedTasks} of {totalTasks} tasks completed
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={[
                styles.inputCard,
                { backgroundColor: colors.card, borderColor: colors.border }
              ]}>
                <TextInput
                  style={[
                    styles.titleInput,
                    { 
                      backgroundColor: colors.textLight,
                      color: '#000000',
                      borderColor: colors.border
                    }
                  ]}
                  placeholder="Task title..."
                  placeholderTextColor={colors.primary}
                  value={newTaskTitle}
                  onChangeText={setNewTaskTitle}
                  onSubmitEditing={() => setShowDescriptionInput(true)}
                  returnKeyType="next"
                />
                
                {showDescriptionInput && (
                  <TextInput
                    style={[
                      styles.descriptionInput,
                      { 
                        backgroundColor: colors.textLight,
                        color: colors.primary,
                        borderColor: colors.border
                      }
                    ]}
                    placeholder="Add description (optional)..."
                    placeholderTextColor={colors.primary}
                    value={newTaskDescription}
                    onChangeText={setNewTaskDescription}
                    onSubmitEditing={handleAddTask}
                    returnKeyType="done"
                    multiline
                    numberOfLines={2}
                  />
                )}
                
                <View style={styles.inputButtons}>
                  {!showDescriptionInput && (
                    <TouchableOpacity
                      style={[styles.addDescriptionButton, { borderColor: colors.primary }]}
                      onPress={() => setShowDescriptionInput(true)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
                      <Text style={[styles.addDescriptionText, { color: colors.primary }]}>
                        Add Description
                      </Text>
                    </TouchableOpacity>
                  )}
                  
                  <TouchableOpacity
                    style={[styles.addButton, { backgroundColor: colors.primary }]}
                    onPress={handleAddTask}
                    activeOpacity={0.8}
                  >
                    <View style={styles.addButtonContent}>
                      <Ionicons name="add" size={20} color={colors.textLight} />
                      <Text style={[styles.addButtonText, { color: colors.textLight }]}>
                        Add
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.taskListContainer}>
              <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={(item) => item.id}
                style={styles.taskList}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <View style={[styles.emptyIconContainer, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                      <Ionicons 
                        name="list-outline" 
                        size={64} 
                        color={colors.textLight} 
                      />
                    </View>
                    <Text style={[styles.emptyText, { color: colors.textLight }]}>
                      No tasks yet
                    </Text>
                    <Text style={[styles.emptySubtext, { color: 'rgba(255,255,255,0.8)' }]}>
                      Add a task to get started!
                    </Text>
                  </View>
                }
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      
      {/* Web Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <View style={styles.overlay}>
          <View style={[styles.confirmDialog, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.confirmTitle, { color: colors.text }]}>Delete Task</Text>
            <Text style={[styles.confirmMessage, { color: colors.textSecondary }]}>
              Are you sure you want to delete this task?
            </Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={[styles.confirmButton, styles.cancelButton, { borderColor: colors.border }]}
                onPress={cancelDelete}
                activeOpacity={0.7}
              >
                <Text style={[styles.confirmButtonText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton, styles.confirmDeleteButton, { backgroundColor: colors.error }]}
                onPress={confirmDelete}
                activeOpacity={0.7}
              >
                <Text style={[styles.confirmButtonText, { color: colors.textLight }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </LinearGradient>
)

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  titleInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
  },
  descriptionInput: {
    minHeight: 60,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  inputButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addDescriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
  },
  addDescriptionText: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  taskListContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  confirmDialog: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    maxWidth: 320,
    width: '90%',
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  confirmMessage: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  confirmDeleteButton: {
    // backgroundColor is set inline
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

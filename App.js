import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Planificare arhitectură UI', completed: true },
    { id: '2', text: 'Configurare componente React Native', completed: false },
    { id: '3', text: 'Testare pe telefon fizic cu Expo', completed: false },
  ]);
  const [text, setText] = useState('');

  const addTask = () => {
    if (!text.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setText('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
        onPress={() => toggleTask(item.id)}
      >
        {item.completed && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
      </TouchableOpacity>

      <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
        {item.text}
      </Text>

      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteBtn}>
        <Ionicons name="trash-outline" size={20} color="#FF2E93" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B14" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titleGradient}>
          My <Text style={styles.titlePink}>Tasks</Text>
        </Text>
        <Text style={styles.subtitle}>Dark & Neon Workspace</Text>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Input bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Adaugă o sarcină nouă..."
          placeholderTextColor="#7D7D99"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Ionicons name="add" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B14', // Dark background profund
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  titleGradient: {
    fontSize: 32,
    fontWeight: '800',
    color: '#9D4EDD', // Mov aprins
    letterSpacing: 0.5,
  },
  titlePink: {
    color: '#FF2E93', // Roz neon
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0C0',
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161626', // Suprafață card
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A1F4D', // Bordură mov închis
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#9D4EDD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkboxCompleted: {
    backgroundColor: '#9D4EDD',
    borderColor: '#9D4EDD',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#F0F0FF',
    fontWeight: '500',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#656582',
  },
  deleteBtn: {
    padding: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#11111E',
    borderTopWidth: 1,
    borderTopColor: '#221A3D',
  },
  input: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#382B5C',
    marginRight: 12,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FF2E93', // Accent principal roz
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF2E93',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
});
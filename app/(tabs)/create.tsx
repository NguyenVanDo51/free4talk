import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Globe, Users, BookOpen, Clock, Star } from 'lucide-react-native';

const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Chinese'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];
const topics = ['Daily Life', 'Business', 'Travel', 'Grammar', 'Pronunciation', 'Culture', 'Academic', 'Casual'];

export default function CreateRoomScreen() {
  const [roomTitle, setRoomTitle] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('6');
  const [description, setDescription] = useState('');

  const handleCreateRoom = () => {
    if (!roomTitle || !selectedLanguage || !selectedLevel || !selectedTopic) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    
    Alert.alert(
      'Room Created!',
      `Your "${roomTitle}" room has been created successfully. Other learners can now join!`,
      [{ text: 'OK' }]
    );
    
    // Reset form
    setRoomTitle('');
    setSelectedLanguage('');
    setSelectedLevel('');
    setSelectedTopic('');
    setMaxParticipants('6');
    setDescription('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create New Room</Text>
        <Text style={styles.subtitle}>Set up your language practice session</Text>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.label}>Room Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Casual English Conversation"
            value={roomTitle}
            onChangeText={setRoomTitle}
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Language *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsContainer}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language}
                style={[
                  styles.optionChip,
                  selectedLanguage === language && styles.selectedChip,
                ]}
                onPress={() => setSelectedLanguage(language)}
              >
                <Globe size={16} color={selectedLanguage === language ? '#ffffff' : '#3B82F6'} />
                <Text style={[
                  styles.optionText,
                  selectedLanguage === language && styles.selectedText,
                ]}>
                  {language}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Level *</Text>
          <View style={styles.gridContainer}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.gridOption,
                  selectedLevel === level && styles.selectedChip,
                ]}
                onPress={() => setSelectedLevel(level)}
              >
                <Star size={16} color={selectedLevel === level ? '#ffffff' : '#8B5CF6'} />
                <Text style={[
                  styles.optionText,
                  selectedLevel === level && styles.selectedText,
                ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Topic *</Text>
          <View style={styles.gridContainer}>
            {topics.map((topic) => (
              <TouchableOpacity
                key={topic}
                style={[
                  styles.gridOption,
                  selectedTopic === topic && styles.selectedChip,
                ]}
                onPress={() => setSelectedTopic(topic)}
              >
                <BookOpen size={16} color={selectedTopic === topic ? '#ffffff' : '#10B981'} />
                <Text style={[
                  styles.optionText,
                  selectedTopic === topic && styles.selectedText,
                ]}>
                  {topic}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Max Participants</Text>
          <View style={styles.participantsContainer}>
            <Users size={20} color="#64748b" />
            <TextInput
              style={styles.participantsInput}
              value={maxParticipants}
              onChangeText={setMaxParticipants}
              keyboardType="numeric"
              maxLength={2}
            />
            <Text style={styles.participantsLabel}>people</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe what you'd like to focus on in this session..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#94a3b8"
          />
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreateRoom}>
          <Clock size={20} color="#ffffff" />
          <Text style={styles.createButtonText}>Create Room</Text>
        </TouchableOpacity>

        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>💡 Tips for a Great Session</Text>
          <Text style={styles.tipText}>• Choose a specific topic to keep conversations focused</Text>
          <Text style={styles.tipText}>• Set clear goals for what you want to practice</Text>
          <Text style={styles.tipText}>• Be patient and encouraging with other learners</Text>
          <Text style={styles.tipText}>• Have fun and don't be afraid to make mistakes!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  optionText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  selectedText: {
    color: '#ffffff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  gridOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  participantsInput: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    minWidth: 30,
    textAlign: 'center',
  },
  participantsLabel: {
    fontSize: 16,
    color: '#64748b',
  },
  textArea: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1e293b',
    height: 100,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 32,
    marginBottom: 24,
  },
  createButtonText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  tips: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0c4a6e',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#0369a1',
    marginBottom: 4,
  },
});
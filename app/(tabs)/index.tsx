import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Search, Users, Clock, Star, Filter } from 'lucide-react-native';
import { RoomCard } from '@/components/RoomCard';
import { LanguageFilter } from '@/components/LanguageFilter';

const mockRooms = [
  {
    id: '1',
    title: 'Casual English Conversation',
    language: 'English',
    level: 'Intermediate',
    topic: 'Daily Life',
    participants: 4,
    maxParticipants: 8,
    hostName: 'Sarah Johnson',
    rating: 4.8,
    isActive: true,
    timeLeft: '45 min',
  },
  {
    id: '2',
    title: 'Business Spanish Practice',
    language: 'Spanish',
    level: 'Advanced',
    topic: 'Business',
    participants: 3,
    maxParticipants: 6,
    hostName: 'Carlos Rodriguez',
    rating: 4.9,
    isActive: true,
    timeLeft: '1h 20min',
  },
  {
    id: '3',
    title: 'French Pronunciation Workshop',
    language: 'French',
    level: 'Beginner',
    topic: 'Pronunciation',
    participants: 2,
    maxParticipants: 5,
    hostName: 'Marie Dubois',
    rating: 4.7,
    isActive: false,
    timeLeft: 'Starting soon',
  },
  {
    id: '4',
    title: 'German Grammar Deep Dive',
    language: 'German',
    level: 'Intermediate',
    topic: 'Grammar',
    participants: 6,
    maxParticipants: 10,
    hostName: 'Hans Mueller',
    rating: 4.6,
    isActive: true,
    timeLeft: '2h 15min',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredRooms = mockRooms.filter(room => {
    const matchesSearch = room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'All' || room.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Language Rooms</Text>
        <Text style={styles.subtitle}>Practice with native speakers worldwide</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search rooms or topics..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#64748b"
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <LanguageFilter
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      )}

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Users size={16} color="#10B981" />
          <Text style={styles.statText}>127 Active</Text>
        </View>
        <View style={styles.statItem}>
          <Clock size={16} color="#F59E0B" />
          <Text style={styles.statText}>24/7 Available</Text>
        </View>
        <View style={styles.statItem}>
          <Star size={16} color="#EF4444" />
          <Text style={styles.statText}>4.8 Avg Rating</Text>
        </View>
      </View>

      <ScrollView style={styles.roomsList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Available Rooms</Text>
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1e293b',
  },
  filterButton: {
    marginLeft: 12,
    padding: 12,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  roomsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 20,
    marginBottom: 16,
  },
});
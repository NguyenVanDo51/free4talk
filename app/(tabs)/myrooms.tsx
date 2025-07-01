import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Calendar, Users, Clock, CreditCard as Edit, Trash2 } from 'lucide-react-native';

const myRooms = [
  {
    id: '1',
    title: 'Advanced Business English',
    language: 'English',
    level: 'Advanced',
    topic: 'Business',
    participants: 5,
    maxParticipants: 8,
    status: 'active',
    createdAt: '2025-01-08',
    nextSession: '2025-01-09 15:00',
  },
  {
    id: '2',
    title: 'Spanish Grammar Workshop',
    language: 'Spanish',
    level: 'Intermediate',
    topic: 'Grammar',
    participants: 3,
    maxParticipants: 6,
    status: 'scheduled',
    createdAt: '2025-01-07',
    nextSession: '2025-01-10 18:00',
  },
  {
    id: '3',
    title: 'French Culture Discussion',
    language: 'French',
    level: 'Beginner',
    topic: 'Culture',
    participants: 2,
    maxParticipants: 5,
    status: 'completed',
    createdAt: '2025-01-05',
    nextSession: null,
  },
];

export default function MyRoomsScreen() {
  const [activeTab, setActiveTab] = useState('active');

  const filteredRooms = myRooms.filter(room => {
    if (activeTab === 'active') return room.status === 'active';
    if (activeTab === 'scheduled') return room.status === 'scheduled';
    if (activeTab === 'completed') return room.status === 'completed';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'scheduled': return '#F59E0B';
      case 'completed': return '#64748b';
      default: return '#64748b';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Live Now';
      case 'scheduled': return 'Scheduled';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Rooms</Text>
        <Text style={styles.subtitle}>Manage your language practice sessions</Text>
      </View>

      <View style={styles.tabContainer}>
        {['active', 'scheduled', 'completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.roomsList} showsVerticalScrollIndicator={false}>
        {filteredRooms.length === 0 ? (
          <View style={styles.emptyState}>
            <Calendar size={48} color="#94a3b8" />
            <Text style={styles.emptyTitle}>No {activeTab} rooms</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'active' 
                ? "You don't have any active rooms right now"
                : activeTab === 'scheduled'
                ? "No scheduled sessions at the moment"
                : "No completed sessions yet"
              }
            </Text>
          </View>
        ) : (
          filteredRooms.map((room) => (
            <View key={room.id} style={styles.roomCard}>
              <View style={styles.roomHeader}>
                <View style={styles.roomTitleContainer}>
                  <Text style={styles.roomTitle}>{room.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(room.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(room.status)}</Text>
                  </View>
                </View>
                <View style={styles.roomActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Edit size={18} color="#64748b" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Trash2 size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.roomDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Language:</Text>
                  <Text style={styles.detailValue}>{room.language} • {room.level}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Topic:</Text>
                  <Text style={styles.detailValue}>{room.topic}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Participants:</Text>
                  <View style={styles.participantsInfo}>
                    <Users size={14} color="#64748b" />
                    <Text style={styles.detailValue}>
                      {room.participants}/{room.maxParticipants}
                    </Text>
                  </View>
                </View>
                {room.nextSession && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Next Session:</Text>
                    <View style={styles.sessionInfo}>
                      <Clock size={14} color="#64748b" />
                      <Text style={styles.detailValue}>
                        {new Date(room.nextSession).toLocaleDateString()} at{' '}
                        {new Date(room.nextSession).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {room.status === 'active' && (
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join Room</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  activeTabText: {
    color: '#ffffff',
  },
  roomsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  roomCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  roomTitleContainer: {
    flex: 1,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  roomActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  roomDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
    marginLeft: 4,
  },
  participantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
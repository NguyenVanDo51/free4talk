import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Users, Star, Clock, Globe } from 'lucide-react-native';

interface Room {
  id: string;
  title: string;
  language: string;
  level: string;
  topic: string;
  participants: number;
  maxParticipants: number;
  hostName: string;
  rating: number;
  isActive: boolean;
  timeLeft: string;
}

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      default: return '#64748b';
    }
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.languageTag}>
          <Globe size={14} color="#3B82F6" />
          <Text style={styles.languageText}>{room.language}</Text>
        </View>
        <View style={[styles.levelBadge, { backgroundColor: getLevelColor(room.level) }]}>
          <Text style={styles.levelText}>{room.level}</Text>
        </View>
      </View>

      <Text style={styles.title}>{room.title}</Text>
      <Text style={styles.topic}>{room.topic}</Text>
      
      <View style={styles.hostInfo}>
        <Text style={styles.hostLabel}>Hosted by </Text>
        <Text style={styles.hostName}>{room.hostName}</Text>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>{room.rating}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.participantsContainer}>
          <Users size={16} color="#64748b" />
          <Text style={styles.participantsText}>
            {room.participants}/{room.maxParticipants} joined
          </Text>
        </View>
        
        <View style={styles.timeContainer}>
          <Clock size={16} color={room.isActive ? '#10B981' : '#F59E0B'} />
          <Text style={[
            styles.timeText,
            { color: room.isActive ? '#10B981' : '#F59E0B' }
          ]}>
            {room.timeLeft}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={[
        styles.joinButton,
        { backgroundColor: room.isActive ? '#10B981' : '#3B82F6' }
      ]}>
        <Text style={styles.joinButtonText}>
          {room.isActive ? 'Join Now' : 'Join Room'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  languageTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  languageText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#1e40af',
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  topic: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hostLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  hostName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  rating: {
    marginLeft: 2,
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#64748b',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  joinButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
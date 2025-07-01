import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Globe } from 'lucide-react-native';

const languages = ['All', 'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Chinese'];

interface LanguageFilterProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageFilter({ selectedLanguage, onLanguageChange }: LanguageFilterProps) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language}
            style={[
              styles.languageChip,
              selectedLanguage === language && styles.selectedChip,
            ]}
            onPress={() => onLanguageChange(language)}
          >
            <Globe 
              size={16} 
              color={selectedLanguage === language ? '#ffffff' : '#3B82F6'} 
            />
            <Text style={[
              styles.languageText,
              selectedLanguage === language && styles.selectedText,
            ]}>
              {language}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  languageChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  languageText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  selectedText: {
    color: '#ffffff',
  },
});
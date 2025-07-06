
import { Colors } from '@/constants/Colors';
import { useTaskContext } from '@/contexts/TaskContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TaskStatsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { getStats, tasks } = useTaskContext();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const {
    totalTasks,
    completedTasks,
    pendingTasks,
    completionRate,
    recentTasks,
    recentCompleted,
  } = getStats();

  const getPreviewHeight = (cardType: string) => {
    let contentLength = 0;
    switch (cardType) {
      case 'total':
        contentLength = tasks.length;
        break;
      case 'completed':
        contentLength = tasks.filter(task => task.completed).length;
        break;
      case 'pending':
        contentLength = tasks.filter(task => !task.completed).length;
        break;
      default:
        return 0;
    }
    return Math.min(contentLength * 40 + 80, 200);
  };

  const hasPreviewContent = (cardType: string) => {
    switch (cardType) {
      case 'total':
        return tasks.length > 0;
      case 'completed':
        return tasks.filter(task => task.completed).length > 0;
      case 'pending':
        return tasks.filter(task => !task.completed).length > 0;
      default:
        return false;
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color, cardType }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon?: string;
    color: string;
    cardType: 'total' | 'completed' | 'pending' | 'rate';
  }) => {
    const isHovered = hoveredCard === cardType;
    
    const getPreviewContent = () => {
      switch (cardType) {
        case 'total':
          return tasks.map(task => ({ title: task.title, description: task.description, completed: task.completed }));
        case 'completed':
          return tasks.filter(task => task.completed).map(task => ({ title: task.title, description: task.description, completed: task.completed }));
        case 'pending':
          return tasks.filter(task => !task.completed).map(task => ({ title: task.title, description: task.description, completed: task.completed }));
        default:
          return [];
      }
    };

    const previewContent = getPreviewContent();
    const previewHeight = Math.min(previewContent.length * 40 + 80, 200);

    const handleMouseEnter = () => {
      if (Platform.OS === 'web') {
        setHoveredCard(cardType);
      }
    };

    const handleMouseLeave = () => {
      if (Platform.OS === 'web') {
        setHoveredCard(null);
      }
    };

    return (
      <View style={[
        styles.statCardWrapper,
        Platform.OS === 'web' && hoveredCard && hoveredCard !== cardType && hasPreviewContent(hoveredCard) && (
          // Only push cards that are directly below the hovered card in the same column
          (hoveredCard === 'total' && cardType === 'pending') ||
          (hoveredCard === 'completed' && cardType === 'rate')
        ) && {
          marginTop: hoveredCard === 'total' ? getPreviewHeight('total') :
                   hoveredCard === 'completed' ? getPreviewHeight('completed') :
                   hoveredCard === 'pending' ? getPreviewHeight('pending') : 0
        }
      ]}>
        <TouchableOpacity
          style={[
            styles.statCard,
            { backgroundColor: colors.card, borderColor: colors.border },
            Platform.OS === 'web' && isHovered && styles.statCardHovered
          ]}
          onPress={() => {}}
          {...(Platform.OS === 'web' && {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
          })}
          activeOpacity={0.8}
        >
          <View style={styles.statHeader}>
            <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
              <Ionicons name={icon as any} size={24} color={color} />
            </View>
            <Text style={[styles.statTitle, { color: colors.text }]}>{title}</Text>
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
          <Text style={[styles.statSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        </TouchableOpacity>
        
        {/* Preview that slides out downward */}
        {Platform.OS === 'web' && isHovered && previewContent.length > 0 && (
          <View style={[
            styles.previewContainer, 
            { 
              backgroundColor: colors.cardSecondary, 
              borderColor: colors.border,
              height: previewHeight
            }
          ]}>
            <View style={styles.previewHeader}>
              <Text style={[styles.previewTitle, { color: colors.text }]}>
                {cardType === 'total' ? 'All Tasks' : cardType === 'completed' ? 'Completed Tasks' : 'Pending Tasks'}
              </Text>
              <Text style={[styles.previewCount, { color: colors.textSecondary }]}>
                {previewContent.length} {previewContent.length === 1 ? 'task' : 'tasks'}
              </Text>
            </View>
            
            <ScrollView style={styles.previewContent} showsVerticalScrollIndicator={false}>
              {previewContent.map((task, index) => (
                <View key={index} style={styles.previewTaskItem}>
                  <View style={styles.previewTaskHeader}>
                    <View style={[
                      styles.previewTaskStatus,
                      { backgroundColor: task.completed ? colors.success + '20' : colors.warning + '20' }
                    ]}>
                      <Ionicons 
                        name={task.completed ? "checkmark-circle" : "time"} 
                        size={12} 
                        color={task.completed ? colors.success : colors.warning} 
                      />
                    </View>
                    <Text style={[
                      styles.previewTaskTitle,
                      { color: colors.text },
                      task.completed && styles.completedTaskText
                    ]}>
                      {task.title}
                    </Text>
                  </View>
                  {task.description && (
                    <Text style={[
                      styles.previewTaskDescription,
                      { color: colors.textSecondary },
                      task.completed && styles.completedTaskText
                    ]}>
                      {task.description}
                    </Text>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.gradientContainer}
    >
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.highlight }]}>Task Statistics</Text>
          <Text style={[styles.subtitle, { color: colors.highlight }]}>
            Overview of your task management, recent activity, and tips for better productivity
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            title="Total Tasks"
            value={totalTasks}
            subtitle="All time"
            icon="list"
            color={colors.primary}
            cardType="total"
          />
          <StatCard
            title="Completed"
            value={completedTasks}
            subtitle="Finished tasks"
            icon="checkmark-circle"
            color={colors.success}
            cardType="completed"
          />
          <StatCard
            title="Pending"
            value={pendingTasks}
            subtitle="Still to do"
            icon="time"
            color={colors.warning}
            cardType="pending"
          />
          <StatCard
            title="Completion Rate"
            value={`${completionRate}%`}
            subtitle="Success rate"
            icon="bar-chart"
            color={colors.accent}
            cardType="rate"
          />
        </View>

        <View style={[
          styles.section,
          Platform.OS === 'web' && hoveredCard === 'pending' && hasPreviewContent('pending') && {
            marginTop: getPreviewHeight('pending')
          }
        ]}>
          <Text style={[styles.sectionTitle, { color: colors.highlight }]}>Recent Activity</Text>
          <View style={[
            styles.activityCard,
            { backgroundColor: colors.cardSecondary, borderColor: colors.border }
          ]}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="calendar" size={20} color={colors.primary} />
              </View>
              <Text style={[styles.activityText, { color: colors.text }]}>
                {recentTasks.length} tasks created 
              </Text>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: colors.success + '20' }]}>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              </View>
              <Text style={[styles.activityText, { color: colors.text }]}>
                {recentCompleted} tasks completed
              </Text>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: colors.secondary + '20' }]}>
                <Ionicons name="bar-chart" size={20} color={colors.primary} />
              </View>
              <Text style={[styles.activityText, { color: colors.text }]}>
                {recentTasks.length > 0 ? Math.round((recentCompleted / recentTasks.length) * 100) : 0}% completion rate
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.highlight }]}>Tips for Better Productivity</Text>
          <View style={[
            styles.tipCard,
            { backgroundColor: colors.card, borderColor: colors.border }
          ]}>
            <View style={styles.tipItem}>
              <View style={[styles.tipIcon, { backgroundColor: colors.highlight + '20' }]}>
                <Ionicons name="bulb" size={16} color={colors.highlight} />
              </View>
              <Text style={[styles.tipText, { color: colors.text }]}>
                Break large tasks into smaller, manageable pieces
              </Text>
            </View>
            <View style={styles.tipItem}>
              <View style={[styles.tipIcon, { backgroundColor: colors.warning + '20' }]}>
                <Ionicons name="time" size={16} color={colors.warning} />
              </View>
              <Text style={[styles.tipText, { color: colors.text }]}>
                Set realistic deadlines for each task
              </Text>
            </View>
            <View style={styles.tipItem}>
              <View style={[styles.tipIcon, { backgroundColor: colors.error + '20' }]}>
                <Ionicons name="star" size={16} color={colors.error} />
              </View>
              <Text style={[styles.tipText, { color: colors.text }]}>
                Prioritize tasks based on importance and urgency
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 200,
  },
  statCardWrapper: {
    position: 'relative',
    width: '47%',
  },
  statCard: {
    width: '100%',
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
    alignItems: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  statSubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  activityCard: {
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
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityText: {
    fontSize: 14,
    flex: 1,
  },
  tipCard: {
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
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  statCardHovered: {
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
    transform: [{ scale: 1.02 }],
    zIndex: 10,
  },
  previewContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 8,
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
    zIndex: 1000,
    overflow: 'hidden',
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  previewCount: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  previewContent: {
    flex: 1,
  },
  previewTaskItem: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  previewTaskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewTaskStatus: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  previewTaskTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  previewTaskDescription: {
    fontSize: 12,
  },
  completedTaskText: {
    fontWeight: 'bold',
  },
});

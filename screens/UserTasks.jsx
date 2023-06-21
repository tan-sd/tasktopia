import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase/firebase';
import { ref, getDatabase, onValue, off } from 'firebase/database';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function UserTasks(){
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState([]);
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Proposal 2.3', checked: false,  project: 'Project 1', dueDate: '2023-06-30' },
        { id: 2, title: 'Pitch Deck', checked: false, project: 'Project 1', dueDate: '2023-06-30'  },
        { id: 3, title: 'Edit Excel', checked: false, project: 'Project 1', dueDate: '2023-06-31'  },
        { id: 4, title: 'Proposal Meeting', checked: false, project: 'Project 2', dueDate: '2023-07-02'  },
        { id: 5, title: 'Proposal Draft 1.0', checked: false, project: 'Project 2', dueDate: '2023-07-03'  }
      ]);

    const handleAccordionToggle = () => {
        if (!accordionOpen) {
          setSelectedTask([]);
        }
        setAccordionOpen(!accordionOpen);
      };

      return (
        <>
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <View style={styles.container}>
                <StatusBar style="auto" />
           </View>

          <View style={styles.accordionContainer}>
            {/* Accordion */}
              <TouchableOpacity style={styles.accordionButton} onPress={handleAccordionToggle}>
                <View>
                  <Icon name="tasks" size={24} color="black" />
                </View>
                <Text style={styles.accordionLabel}>Tasks</Text>
              </TouchableOpacity>
              
            {/* Accordion Content */}
              {accordionOpen && (
              <View contentContainerStyle={styles.taskContentContainer}>
                <ScrollView>
                {tasks.map((task) => (
                  <TouchableOpacity
                    key={task.id}
                    style={styles.taskItem}
                    onPress={() => handleTaskSelection(task.id)}
                  >
                      <View style={styles.taskCheckBox}>
                        {task.checked ? (
                          <Icon name="check-square-o" size={20} color="black" />
                        ) : (
                          <Icon name="square-o" size={20} color="black" />
                        )}
                      </View>
                      <View style={styles.taskContent}>
                        <Text style={styles.taskText}>{task.title}</Text>
                        <View style={styles.taskBadges}>
                          <Text style={styles.badgeProject}>{task.project}</Text>
                          <Text style={styles.badgeDate}>{task.dueDate}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                </View>
                )}
          

        </View>
        </SafeAreaView>
        </>
    )
  
}

import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView, Dimensions, ScrollView } from 'react-native';
// import * as React from 'react';
import { Suspense, useRef, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase/firebase';
import { ref, getDatabase, onValue, off } from 'firebase/database';
// import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserTasks = ({route}) =>{

    const { userDetails } = route.params;
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
      };  
    
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState([]);
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Proposal 2.3', checked: false,  project: 'Project 1', dueDate: '2023-06-30' },
        { id: 2, title: 'Pitch Deck', checked: false, project: 'Project 1', dueDate: '2023-06-30'  },
        { id: 3, title: 'Edit Excel', checked: false, project: 'Project 1', dueDate: '2023-06-31'  },
        { id: 4, title: 'Proposal Meeting', checked: false, project: 'Project 2', dueDate: '2023-07-02'  },
        { id: 5, title: 'Proposal Draft 1.0', checked: false, project: 'Project 2', dueDate: '2023-07-03'  }
      ]);

      const [giveTask, setNewTask] = useState('');

        const handleInputChange = (text) => {
            setNewTask(text);
        };

        const handleSubmit = () => {
            // Handle the submit action
            console.log('Submitted:', giveTask);
            // You can perform any logic or API calls here
        };

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

            <View style={styles.profileWrapper}>
                <StatusBar style="auto" />
           <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={{uri: userDetails.profileImg}}
                        style={styles.profileImg}
                        resizeMode="cover"
                    />
                    <View style={styles.profileDetails}>
                        <Text style={[styles.friendName, styles.gothamBold]}>{userDetails.firstName} {userDetails.lastName}</Text>
                         <Text style={[styles.friendJobRole, styles.gothamBook]}>{userDetails.jobRole}</Text>

                        <View style={{flexDirection: 'row', marginTop: 25}}>
                        </View>
                    </View>
                </View>

           <View>
                <Image
                    source={{uri: userDetails.profileImg}}
                    style={styles.friendsImg}
                />
            </View>
        </View>
        <View style={{display:flex, justifyContent:'space-around'}} >
            <TextInput
            style={{ borderWidth: 1, padding: 10, width:200 }}
            value={giveTask}
            onChangeText={setNewTask}
            placeholder="Enter new task here"
            />
            <Button title="Allocate Task" onPress={handleSubmit} />
        </View>
          <View style={styles.accordionContainer}>
            {/* ONGOING Accordion */}
              <TouchableOpacity style={styles.accordionButton} onPress={handleAccordionToggle}>
                <View>
                  <Icon name="tasks" size={24} color="black" />
                </View>
                <Text style={styles.accordionLabel}>Ongoing Tasks</Text>
              </TouchableOpacity>
              
            {/* Accordion Content */}
              {accordionOpen && (
              <View contentContainerStyle={styles.taskContentContainer}>
                <ScrollView>
                {tasks.map((task) => (
                  <TouchableOpacity
                    key={task.id}
                    style={styles.taskItem}
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
        

        <View>
    
    </View>

        <TouchableOpacity
                    onPress={handleGoBack}
                    style={styles.goBackBtn}>
            <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
        </SafeAreaView>
        </>
    )
  
}

export default UserTasks;

const styles = StyleSheet.create({
    profileWrapper: {
        marginLeft: 40,
        marginTop: 15
    },
    profileImg: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        width: 100,
        height: 100,
        marginTop: 30
    },
    goBackBtn: {
        top: 0,
        position: "absolute",
        left: 0,
        marginLeft: 40,
        marginTop: 30,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fedb7d',
        width: '100%'
    },
    accordionContainer: {
        top: '75%',
        // marginTop: 10,
        // marginBottom: 10,
        // borderWidth: 1,
        width:Dimensions.get('window').width * 0.9,
        position: 'absolute',
        zIndex: 1,
        maxHeight: 200,
      },
      accordionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
      },
      accordionLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
      },

      taskContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FFF5DB',
        overflow: 'hidden',
      },
      taskText: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 5, 
        fontWeight: 'bold',
      },
      eventText:{
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 5, 
        fontWeight: 'bold',
      },
      taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        borderWidth: 1, 
        borderColor: 'black', 
        borderRadius: 5, 
        backgroundColor: '#FFF5DB', 
        padding: 5, 
        marginTop: 2,
      },
      eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        borderWidth: 1, 
        borderColor: 'black', 
        borderRadius: 5, 
        backgroundColor: '#FFF5DB', 
        padding: 5, 
        marginTop: 2,
      },
      taskContent: {
        flex: 1,
        marginLeft: 10,
      },
      taskBadges: {
        flexDirection: 'row',
        marginTop: 5,
      },
})
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView, Dimensions, ScrollView } from 'react-native';
// import * as React from 'react';
import { Suspense, useRef, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
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
    const [appTasks, setAppTasks] = useState([
        { id: 1, title: 'Pitch Deck for Client', checked: false, project: 'Project 2A', dueDate: '2023-07-02'  },
        { id: 2, title: 'Marketing Proposal Draft 1.0', checked: false, project: 'Project 2A', dueDate: '2023-07-03'  }
      ]);

      const [tasks, setTasks] = useState([
        { id: 1, title: 'Sports League - Ultimate', checked: false, project: 'Event', dueDate: '2023-06-30'},
        { id: 2, title: 'Proposal 2.3', checked: false,  project: 'Project 1', dueDate: '2023-06-30' },
        { id: 3, title: 'Pitch Deck', checked: false, project: 'Project 1', dueDate: '2023-06-30'  },
        { id: 4, title: 'Edit Excel', checked: false, project: 'Project 1', dueDate: '2023-06-31'  },
        { id: 5, title: 'Proposal Meeting', checked: false, project: 'Project 2', dueDate: '2023-07-02'  },
        { id: 6, title: 'Proposal Draft 1.0', checked: false, project: 'Project 2', dueDate: '2023-07-03'  },
        { id: 7, title: 'Townhall Meeting', checked: false, project: 'Event', dueDate: '2023-07-03',},
      ]);


    //   this one for approval
      const handleTaskSelection = (taskId) => {
        const updatedTasks = appTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, checked: !task.checked };
          }
          return task;
        });
        setSelectedTask(updatedTasks.filter((task) => task.checked).map((task) => task.id));
        setAppTasks(updatedTasks);
        
   
      }
      
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

      const [loaded] = useFonts({
        GothamBold: require('../assets/fonts/Gotham-Bold.otf'),
        GothamBook: require('../assets/fonts/Gotham-Book.otf')
      });

      if (!loaded) {
        return null;
      }

      return (
        <>
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <View style={styles.container}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 30, marginTop: 70, marginLeft: -40}}>
                <View>
                  <Image
                    source={{uri: userDetails.profileImg}}
                    style={styles.friendsImg}
                    />
                </View>

                <View style={styles.friendDetailseWrapper}>
                  <Text style={[styles.friendName, styles.gothamBold]}>{userDetails.firstName} {userDetails.lastName}</Text>
                  <Text style={[styles.friendJobRole, styles.gothamBook]}>{userDetails.jobRole}</Text>
                </View>
                    
              </View>
            </View>

            {/* <View>
              <Image
                source={{uri: userDetails.profileImg}}
                style={styles.friendsImg}
              />
            </View> */}

        <View style={{top: 200,position: "absolute",left: 5,marginLeft: 40,marginTop: 30,}}>
          <Text style={[styles.accordionLabel, styles.gothamBold]}>Allocate New Tasks</Text>
          
          <View style={{justifyContent:'space-between', marginTop:25}} >
            <View>
              <TextInput
                style={{ borderWidth: 1, padding: 10, height: 100, borderRadius: 10, width: 300}}
                value={giveTask}
                multiline
                numberOfLines={8}
                onChangeText={setNewTask}
                placeholder="Enter new task here"
              />
            </View>
            <View>
              <Button title="Allocate Task" onPress={handleSubmit} buttonStyle={{ textAlign: 'center', alignItems:'center' }} />
            </View>
          </View>
        </View>

        {/* approved tasks */}

        <View style={{top: 420,position: "absolute",left: 5,marginLeft: 40,marginTop: 30,}}>
          <Text style={[styles.accordionLabel, styles.gothamBold]}>To Be Approved Tasks</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:25}} >
            <View style={{ width:200, height: 700, marginRight: 50 }}>
              <View>
                <ScrollView>
                {appTasks.map((task) => (
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
            </View>
            <View>

            </View>
        </View>
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
                    {/* here */}
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
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fedb7d',
    width: '100%'
  },
  friendsImg: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
    width: 90,
    height: 90,
  },
  goBackBtn: {
    top: 0,
    position: "absolute",
    left: 0,
    marginLeft: 40,
    marginTop: 70,
  },
  friendDetailsWrapper: {
    alignContent: 'center',
  },
  friendName: {
    fontSize: 20
  },
  friendJobRole: {
    marginTop: 5,
    fontSize: 14
  },
  gothamBold: {
    fontFamily: 'GothamBold'
  },
  gothamBook: {
      fontFamily: 'GothamBook'
  },
  taskContentContainer: {
    paddingBottom: 150, // Add some padding to the bottom to ensure scrolling space
    height: 200,
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
  taskText: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 5, 
    fontWeight: 'bold',
  },
  taskContent: {
    flex: 1,
    marginLeft: 10,
  },
  taskBadges: {
    flexDirection: 'row',
    marginTop: 5,
  },
  badgeProject: {
    marginLeft: 7,
    backgroundColor: '#699BF7',
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    borderRadius: 8,
  },
  badgeCategory:{
    backgroundColor: '#699BF7',
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    borderRadius: 8,
  },
  badgeDate: {
    backgroundColor: '#FF8577',
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    borderRadius: 8,
  },
  taskContentContainer: {
    paddingBottom: 150, // Add some padding to the bottom to ensure scrolling space
    height: 200,
  },
  accordionContainer: {
    top: 700,
    // marginTop: 10,
    // marginBottom: 10,
    // borderWidth: 1,
    width:Dimensions.get('window').width * 0.8,
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
  eventAccordionLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
})
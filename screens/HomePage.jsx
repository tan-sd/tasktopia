import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, SafeAreaView, Dimensions, ScrollView, Easing, Animated, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber/native';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useRef, useLayoutEffect, useState } from 'react';
import { TextureLoader } from 'expo-three';
import useControls from 'r3f-native-orbitcontrols';
import PuduModel from '../components/PuduModel';
import SparrowModel from '../components/SparrowModel';
import InkFishModel from '../components/InkFishModel';
import { auth } from '../firebase/firebase';
import { ref, getDatabase, onValue, off } from 'firebase/database';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal2 from 'react-native-modal';

const useHeartsAnimation = () => {
  const [hearts, setHearts] = useState([]);

  const addHeart = () => {
    const newHeart = {
      id: Date.now(),
      position: new Animated.Value(0),
      opacity: new Animated.Value(1),
      size: new Animated.Value(0),
    };

    setHearts([...hearts, newHeart]);

    Animated.parallel([
      Animated.timing(newHeart.position, {
        toValue: -200,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(newHeart.opacity, {
        toValue: 0,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(newHeart.size, {
        toValue: 1,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setHearts(hearts.filter((heart) => heart.id !== newHeart.id));
    });
  };

  return [hearts, addHeart];
};


export default function HomePage({navigation}) {
    const [dbPet, setDbPet] = useState('');
    const inkFishAnimationRef = React.useRef('');
    const [hearts, addHeart] = useHeartsAnimation();

    const handleActivateAnimation = () => {
      if (inkFishAnimationRef.current && inkFishAnimationRef.current.activateAnimation) {
        inkFishAnimationRef.current.activateAnimation();
      }
    };

    const glRef = useRef();

    const onCreated = (state) => {
      const _gl = state.gl.getContext();
      const pixelStorei = _gl.pixelStorei.bind(_gl);
  
      _gl.pixelStorei = function(...args) {
        const [parameter] = args;
  
        switch (parameter) {
          case _gl.UNPACK_FLIP_Y_WEBGL:
            return pixelStorei(...args);
        }
      };
    } 

    const [OrbitControls, events] = useControls();
    // Start of Task Accordion
    const [accordionOpen, setAccordionOpen] = useState(true);
    const [selectedTask, setSelectedTask] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [taskId, setTaskId] = useState('');
    const [tasks, setTasks] = useState([
      { id: 1, title: 'Sports League - Ultimate', checked: false, project: 'Event', dueDate: '2023-06-30'},
      { id: 2, title: 'Proposal 2.3', checked: false,  project: 'Project 1', dueDate: '2023-06-30' },
      { id: 3, title: 'Pitch Deck', checked: false, project: 'Project 1', dueDate: '2023-06-30'  },
      { id: 4, title: 'Edit Excel', checked: false, project: 'Project 1', dueDate: '2023-06-31'  },
      { id: 5, title: 'Proposal Meeting', checked: false, project: 'Project 2', dueDate: '2023-07-02'  },
      { id: 6, title: 'Proposal Draft 1.0', checked: false, project: 'Project 2', dueDate: '2023-07-03'  },
      { id: 7, title: 'Townhall Meeting', checked: false, project: 'Event', dueDate: '2023-07-03',},
    ]);

    const handleAccordionToggle = () => {
      if (!accordionOpen) {
        setSelectedTask([]);
      }
      setAccordionOpen(!accordionOpen);
    };
    // End of Task Accordion

    // Start of Events Accordion
    const [eventsAccordionOpen, setEventsAccordionOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState([]);
    const [allEvents, setAllEvents] = useState([
      { id: 1, title: 'Sports League - Ultimate', checked: false, category: 'Sports', date: '2023-06-30',},
      { id: 2, title: 'Townhall Meeting', checked: false, category: 'Work', date: '2023-07-03',},
    ]);
    const handleEventsAccordionToggle = () => {
      if (!eventsAccordionOpen) {
        setSelectedEvent([]);

      }
      setEventsAccordionOpen(!eventsAccordionOpen);
    };
    // End of Events Accordion

    const [leftProgress, setLeftProgress] = useState(0);

    const handleTaskSelection = (taskId) => {
      // const updatedTasks = tasks.map((task) => {
      //   if (task.id === taskId) {
      //     return { ...task, checked: !task.checked };
      //   }
      //   return task;
      // });

      // setSelectedTask(updatedTasks.filter((task) => task.checked).map((task) => task.id));
      // setTasks(updatedTasks);
      // setModalVisible(true);

      // Check if the task is already selected
      const isTaskSelected = selectedTask.includes(taskId);

      if (isTaskSelected) {
        // Task is already selected, remove it from the selectedTask array
        const updatedSelectedTask = selectedTask.filter((id) => id !== taskId);
        setSelectedTask(updatedSelectedTask);
      } else {
        // Task is not selected, add it to the selectedTask array
        setSelectedTask([...selectedTask, taskId]);
      }
      
      //Increase level progress bar by 0.1
      // if (updatedTasks.find((task) => task.id === taskId).checked) {
      //   setLeftProgress((prevProgress) => prevProgress + 0.1);

      //   setFeedRemaining((prevRemainingFeeds) => prevRemainingFeeds + 1);

      // }else {
      //   setLeftProgress((prevProgress) => prevProgress - 0.1);
      //   if (feedRemaining > 0){
      //     setFeedRemaining((prevRemainingFeeds) => prevRemainingFeeds - 1);
      //   }
      // }
        // Increase or decrease progress and feed counts based on task selection

      //Increase level progress bar by 0.1
      if (isTaskSelected) {
        setLeftProgress((prevProgress) => prevProgress + 0.1);
        setFeedRemaining((prevRemainingFeeds) => prevRemainingFeeds + 1);
      } else {
        setLeftProgress((prevProgress) => prevProgress - 0.1);
        if (feedRemaining > 0) {
          setFeedRemaining((prevRemainingFeeds) => prevRemainingFeeds - 1);
        }
      }
      setModalVisible(true);
    }

    const handleModalConfirmation = (confirmed) => {
      if (confirmed) {
        // Update the tasks to set the checkbox as checked
        const updatedTasks = tasks.map((task) => {
          if (selectedTask.includes(task.id)) {
            return { ...task, checked: true };
          }
          return task;
        });
        setTasks(updatedTasks);
        // Update progress and feed counts based on task selection
        setLeftProgress((prevProgress) => prevProgress + 0.1 * selectedTask.length);
        setFeedRemaining((prevRemainingFeeds) => prevRemainingFeeds + selectedTask.length);
      }
      // Close the modal
      setModalVisible(false);
    };

    const handleEventSelection = (eventId) => {
      const updatedEvents = allEvents.map((event) => {
        if (event.id === eventId) {
          return { ...event, checked: !event.checked };
        }
        return event;
      });
      setSelectedEvent(updatedEvents.filter((event) => event.checked).map((event) => event.id));
      setAllEvents(updatedEvents);

      if (updatedEvents.find((event) => event.id === eventId).checked) {
        setLeftProgress((prevProgress) => prevProgress + 0.1);

        setFeedRemaining((prevRemainingFeeds) => prevRemainingFeeds + 1);

      }else {
        setLeftProgress((prevProgress) => prevProgress - 0.1);
        if (feedRemaining > 0){
          setFeedRemaining((prevRemainingFeeds) => prevRemainingFeeds - 1);
        }

      }
    };

    // Modal 
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [projectName, setProjectName] = useState('');
    const [dueDate, setDueDate] = useState('');

    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };

    const handleAddTask = () => {
      // Perform validation and add the task to the tasks state
      if (taskTitle && projectName && dueDate) {
        const newTask = {
          id: tasks.length + 1,
          title: taskTitle,
          checked: false,
          project: projectName,
          dueDate: dueDate,
        };
    
        // setTasks([...tasks, newTask]);
        setTaskTitle('');
        setProjectName('');
        setDueDate('');
        toggleModal();
      }
    };
    
    const [feedRemaining, setFeedRemaining] = useState(4);
    const [rightProgress, setRightProgress] = useState(0.3);
    const handleFeedButtonPress = () => {
      if (feedRemaining > 0 && rightProgress < 1) {
        setFeedRemaining((prevRemainingFeeds) => prevRemainingFeeds - 1);

        if (rightProgress < 1) {
        setRightProgress((prevProgress) => Math.round((prevProgress + 0.1)*10)/10);
      }

      if (inkFishAnimationRef.current && inkFishAnimationRef.current.activateAnimation) {
        inkFishAnimationRef.current.activateAnimation();
      }
    }
  };

    React.useEffect(() => {
        const fetchDbPet = async () => {
          const user = auth.currentUser;
          const dbRef = ref(getDatabase(), `users/${user.uid}/selectedPet`);
      
          const petRef = onValue(dbRef, (snapshot) => {
            const selectedPet = snapshot.val();
            setDbPet(selectedPet);
          });
      
          return () => {
            off(petRef);
          };
        };
      
        fetchDbPet();
      }, []);

    return (
        <>
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <View style={styles.container}>
                <StatusBar style="auto" />
                {dbPet === 'pudu' && (
                    <Image
                        source={require('../assets/img/background/pudu-background.png')}
                        style={styles.bgImage}
                        resizeMode="cover"
                    />
                )}
                {dbPet === 'sparrow' && (
                    <Image
                        source={require('../assets/img/background/sparrow-background.png')}
                        style={styles.bgImage}
                        resizeMode="cover"
                    />
                )}
                {dbPet === 'inkfish' && (
                    <Image
                        source={require('../assets/img/background/inkfish-background.jpg')}
                        style={styles.bgImage}
                        resizeMode="cover"
                    />
                )}
                <View style={styles.canvasWrapper} {...events}>
                    <Canvas
                        onCreated={onCreated}
                        style={styles.canvas}>
                        <ambientLight/>
                            <OrbitControls/>
                            <Suspense fallback={null}>
                                {/* <PuduModel /> */}
                                {dbPet === 'pudu' && <PuduModel />}
                                {dbPet === 'sparrow' && <SparrowModel />}
                                {dbPet === 'inkfish' && <InkFishModel animationRef={inkFishAnimationRef} />}
                            </Suspense>
                    </Canvas>
                </View>
            </View>

          {/* Progress Bars */}
            <View style={styles.progressContainer}>
            {/* Level Progress Bar */}
              <View style={[styles.progressBar, styles.leftProgressBar]}>
                <View style={styles.iconContainer}>
                  <Icon name="star" size={18} color="black" />
                </View>
                  <ProgressBar
                    progress={leftProgress + 0.4} // progress value 40%
                    width={135}
                    height={25}
                    borderRadius={20}
                    borderWidth={3}
                    color={'#FF8577'}
                  />
                    <View style={styles.progressTextContainer}>
                      <Text style={styles.progressText}>Level 4</Text>
                    </View>
              </View>
            {/* Health Progress Bar */}
              <View style={[styles.progressBar, styles.rightProgressBar]}>
                <View style={styles.iconContainer}>
                  <Icon name="heart" size={18} color="black" />
                </View>
                <ProgressBar
                  progress={rightProgress} // progress value (30%)
                  width={135}
                  height={25}
                  borderRadius={20}
                  borderWidth={3}
                  color={'#FF8577'}
                />
                <View style={styles.progressTextContainer}>
                  <Text style={styles.progressText}>{rightProgress *100 }%</Text>
                </View>
              </View>
          </View>

          {hearts.map((heart) => (
        <Animated.View
          key={heart.id}
          style={[
            styles.heart,
            {
              transform: [
                { translateY: heart.position },
                { scale: heart.size.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 1.2, 1] }) },
              ],
              opacity: heart.opacity,
            },
          ]}
        >
          {/* Customize the heart shape or icon */}
          <Text style={styles.heartIcon}>❤️</Text>
        </Animated.View>
      ))}

            {/* Feed Button */}
          <View style={styles.feedButtonContainer}>
            <Text style={styles.infoText}>Feed to add health</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { handleFeedButtonPress(); addHeart(); }}
              disabled={feedRemaining === 0 || rightProgress === 1.0}>
              <View style={styles.buttonContent}>
                <Icon name="heart" size={18} color="#FF8577" />
                <Text style={styles.buttonText}>{feedRemaining} remaining</Text>
              </View>
            </TouchableOpacity>
          </View>

           {/* <View style={styles.horizontalLine} /> */}


          {/* Add Tasks Button */}
          <View style={styles.addTaskButtonContainer}>
            <TouchableOpacity style={styles.addTaskButton} onPress={toggleModal}>
              <Icon name="plus" size={18} color="#FF8577" />
              <Text marginLeft={4} >Add Task</Text> 
            </TouchableOpacity>
          </View>
                      {/* Add Task Modal */}
            <Modal2 isVisible={isModalVisible}>
              <View style={styles.modalContainer1}>
                <Text style={styles.modalTitle}>Add Task</Text>
                <TextInput
                  style={[styles.input, { color: 'black' }]} // Change text color here
                  placeholder="Task Title" // Change placeholder text here
                  placeholderTextColor="black" // Change placeholder text color here
                  value={taskTitle}
                  onChangeText={setTaskTitle}
                />
                <TextInput
                  style={[styles.input, { color: 'black'}]}
                  placeholder="Project Name"
                  value={projectName}
                  placeholderTextColor="black"
                  onChangeText={setProjectName}
                />
                <TextInput
                  style={[styles.input, { color: 'black'}]}
                  placeholder="Due Date"
                  value={dueDate}
                  placeholderTextColor="black"
                  onChangeText={setDueDate}
                />
                <View style={styles.modalButtonContainer}>
                  <Button title="Send for Approval" onPress={handleAddTask} style={styles.approvalButton}/>
                  <Button title="Close" onPress={toggleModal} style={styles.CloseButton} />
                </View>
              </View>
            </Modal2>

          <View style={styles.accordionContainer}>
            {/* Accordion */}
              <TouchableOpacity style={styles.accordionButton} onPress={handleAccordionToggle}>
                <View>
                  <Icon name="tasks" size={24} color="black" />
                </View>
                <Text style={styles.accordionLabel}>Tasks & Events</Text>
              </TouchableOpacity>

            {/* Modal */}
            <Modal
              visible={modalVisible}
              animationType="fade"
              transparent={true}
              onRequestClose={() => handleModalConfirmation(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Confirm?</Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => handleModalConfirmation(true)}
                    >
                      <Text style={styles.modalButtonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => handleModalConfirmation(false)}
                    >
                      <Text style={styles.modalButtonText}>No</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
              
            {/* Accordion Content */}
              {accordionOpen && (
              <View contentContainerStyle={styles.taskContentContainer}>
                <ScrollView>
                {tasks.map((task) => (
                  <TouchableOpacity
                    key={task.id}
                    style={styles.taskItem}
                    // onPress={() => { handleTaskSelection(task.id); }}
                    onPress={() => {
                      setModalVisible(true);
                      setSelectedTask([task.id]);
                    }}
                    disabled={task.checked}
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

          {/* Event Accordion */}
          {/* <View style={styles.eventAccordionContainer}> */}
            {/* Accordion */}
              {/* <TouchableOpacity style={styles.eventAccordionButton} onPress={handleEventsAccordionToggle}>
                <View>
                  <Icon name="calendar" size={24} color="black" />
                </View>
                <Text style={styles.eventAccordionLabel}>Events</Text>
              </TouchableOpacity> */}
            {/* Accordion Content */}
              {/* {eventsAccordionOpen && (
              <View contentContainerStyle={styles.eventContentContainer}>
                <ScrollView>
                {allEvents.map((event) => (
                  <TouchableOpacity
                    key={event.id}
                    style={styles.eventItem}
                    onPress={() => handleEventSelection(event.id)}
                  >
                      <View style={styles.eventCheckBox}>
                        {event.checked ? (
                          <Icon name="check-square-o" size={20} color="black" />
                        ) : (
                          <Icon name="square-o" size={20} color="black" />
                        )}
                      </View>
                      <View style={styles.eventContent}>
                        <Text style={styles.eventText}>{event.title}</Text>
                        <View style={styles.eventBadges}>
                          <Text style={styles.badgeCategory}>{event.category}</Text>
                          <Text style={styles.badgeDate}>{event.date}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                </View>
                )}
        </View> */}
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fedb7d',
  },
  bgImage: {
      position: 'absolute',
      width: '70%',
      height: '40%',
      borderRadius: 30,
      top: 63
  },
  canvas: {
      height: '56%',
      // aspectRatio: 1,
      borderColor: 'black',
      borderRadius: 30,
      // borderWidth: 1,
    },
  canvasWrapper: {
      width: 300,
      height: '40%',
      bottom: 0,
      position: 'absolute',
      top:'8%',
  },
  progressContainer: {
    position: 'absolute',
    top: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 12,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  leftProgressBar: {
    justifyContent: 'flex-start',
  },
  rightProgressBar: {
    justifyContent: 'flex-end',
  },
  progressTextContainer: {
    position: 'absolute',
    left: 30,
    right: 0,
    top: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -6 }],
  },
  progressText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',

  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  feedButtonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '41%', 

  },
  infoContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  infoText: {
    color: 'black',
    fontSize: 14,
    // fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    borderColor: 'black',
    backgroundColor: '#D9D9D9',
    // backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
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
  eventAccordionLabel: {
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
  horizontalLine: {
    borderBottomColor: 'black',
    borderWidth: 0.5,
    width: '100%', 
    bottom: '38%',
  },  
  addTaskButtonContainer: {
    width: '100%',
    alignItems: 'left',
    // justifyContent: 'center',
    position: 'absolute',
    bottom: '33%', 
    paddingLeft: 20,
    zIndex: 2,
  },
  addTaskButton:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    zIndex: 3,
    // color: '#FFC700',
    // margin: 5,
  },
  joinEventButtonContainer: {
    width: '100%',
    alignItems: 'left',
    // justifyContent: 'center',
    position: 'absolute',
    bottom: '33%', 
    paddingLeft: 120,
  },
  joinEventButton:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  eventAccordionContainer: {
    top: '85%',
    // marginTop: 10,
    // marginBottom: 10,
    // borderWidth: 1,
    width:Dimensions.get('window').width * 0.9,
    position: 'absolute',
    zIndex: 1,
    maxHeight: 200,
  },
  eventAccordionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
  }, 
  eventContentContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFF5DB',
    overflow: 'hidden',
  },
  eventCheckBox: {
  },
  eventContent:{
    flex: 1,
    marginLeft: 10,
  },
  eventBadges: {
    flexDirection: 'row',
    marginTop: 5,
  },
  heart: {
    position: 'absolute',
    bottom: '50%', // Start from the middle of the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 30,
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff', // White background
    borderRadius: 10,
    padding: 20,
    width: 200,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF', // Blue button background color
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff', // White button text color
    fontSize: 16,
    fontWeight: 'bold',
  },  
  modalContainer1: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20,
    padding:35, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: { 
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 0.5,
    fontSize: 20,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FF8577',
    // color: 'black',
    width: '100%',
    borderRadius: 10,
  },
})

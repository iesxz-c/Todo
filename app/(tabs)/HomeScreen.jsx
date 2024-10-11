import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet,ImageBackground, TextInput, Pressable ,Button, FlatList } from 'react-native';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../../api';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import JOO from '@/assets/images/JOO.jpg';
import { useRouter } from 'expo-router';


const HomeScreen = () => {
    const router = useRouter();
    const[iscompleted,setIscompleted] =useState(false)
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const loadTodos = async () => {
        const todos = await fetchTodos();
        setTodos(todos);
    };

    const handleAddTodo = async () => {
        const newTodo = { title, description, completed: false };
        await createTodo(newTodo);
        setTitle('');
        setDescription('');
        loadTodos();
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        loadTodos();
    };

    const toggleCompletion = (id) => {
      setTodos((prevTodos) =>
          prevTodos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
      );};

    useEffect(() => {
        loadTodos();
    }, []);

    

    
    return (
        
        <View style={{ flex: 1,color:"white" }}>
        <ImageBackground source={JOO} style={styles.background}>
        <View style={{
      ...StyleSheet.absoluteFillObject,  
      backgroundColor: 'rgba(0, 0, 0, 0.5)'  
    }} />
          <View style={{
            marginBottom:30,
            borderColor:"white",
            borderRadius: 9, borderWidth: 2, marginTop: 80, width: '90%', alignItems: "center", justifyContent: "center"
          }}>
            <Text style={{
              color:"orange",marginTop: 18, marginBottom: 18, fontFamily: "monospace", fontWeight: "bold", fontSize: 19
            }}>Todo</Text>
      
            <View style={{
              flexDirection: "row", alignItems: "center", margin: 20, marginTop: 10, marginBottom: 20
            }}>
              <TextInput
                style={{
                 borderColor:"gray",color:"white", flex: 1, padding: 10, borderWidth: 1, borderRadius: 5, paddingRight: 40  // space for the icon
                }}
                placeholder="Enter a title"
                 placeholderTextColor="gray"
                value={title}
                onChangeText={setTitle}
              />
            </View>
      
            <View style={{
              flexDirection: "row", alignItems: "center", margin: 20, marginTop: 10, marginBottom: 20
            }}>
              <TextInput
                placeholder="Description"
                 placeholderTextColor="gray"
                style={{
                    borderColor:"gray",color:"white",flex: 1, padding: 10, borderWidth: 1, borderRadius: 5, paddingRight: 40  // space for the icon
                }}
                value={description}
                onChangeText={setDescription}
              />
              <TouchableOpacity  onPress={handleAddTodo} style={{ position: 'absolute', right: 20 }}>
                <Ionicons name="add-circle" size={30} color="orange" />
              </TouchableOpacity >
            </View>
          </View>
            
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                            
                           <View style={{
                            marginVertical: 5,
                            padding: 10,
                            borderRadius: 5,
                            flexDirection: 'row',
                            alignItems: "center", 
                            justifyContent: "center"
                           }}>
                            <TouchableOpacity onPress={() => toggleCompletion(item.id)}  style={{ alignItems:"center", justifyContent:"center",
                                borderColor:"#47300c" , borderWidth:2,
                                overflow:"hidden",height:70,minWidth:70,borderRadius:20,
                                backgroundColor:"#d37408"
                            }}>
                            <Text style={{ color: "#123a37" }}>{item.title}</Text>
                            <Ionicons
                                    name={item.completed ? "checkmark-circle" : "close-circle"}
                                    size={24}
                                    color={item.completed ? "#1f571f" : "#9b1a1a"}
                                />

                            </TouchableOpacity >
                            <TouchableOpacity style={{alignItems:"center",justifyContent:"center",borderWidth:2,minWidth:270,marginLeft:5,minHeight:70,
                                borderRadius:20,backgroundColor:"#886210",borderColor:"#081f3a"
                            }}>
                            <Text style={{ color: "white" }}>{item.description}  </Text>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={() => handleDeleteTodo(item.id)} style={{ padding: 10 , position: 'absolute', right: 23,top: 5}}>
                            <Ionicons name="trash" size={24} color="#8b0707" /> 
                            </TouchableOpacity >
                            <TouchableOpacity onPress={()=>router.push(`/EditScreen?id=${item.id}`)} style={{top:15,right:26}}>
                                <Ionicons name="create-outline" size={24} color="#75e011f0" />
                            </TouchableOpacity>
                            </View>
                )}
                contentContainerStyle={{ paddingBottom: 20 }} 
            />
            </ImageBackground>
        </View>
        
    );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    
  },
 
});


export default HomeScreen;

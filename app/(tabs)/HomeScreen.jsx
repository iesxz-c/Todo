import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet,ImageBackground, TextInput, Button, FlatList } from 'react-native';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../../api';

import JOO from '@/assets/images/JOO.jpg';

const HomeScreen = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const loadTodos = async () => {
        const todos = await fetchTodos();
        setTodos(todos);
    };

    const handleAddTodo = async () => {
        const newTodo = { title, description };
        await createTodo(newTodo);
        setTitle('');
        setDescription('');
        loadTodos();
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        loadTodos();
    };

    useEffect(() => {
        loadTodos();
    }, []);

    return (
        <ImageBackground source={JOO} style={styles.background}>
        <View>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <Button title="Add Todo" onPress={handleAddTodo} />
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Button title="Delete" onPress={() => handleDeleteTodo(item.id)} />
                    </View>
                )}
            />
        </View>
        </ImageBackground>
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

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet,ImageBackground, TouchableOpacity } from 'react-native';
import { fetchTodoById, updateTodo } from '../../api'; 
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons';
import JOO from '@/assets/images/JOO.jpg';

const EditScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTodo = async () => {
            try {
                const todo = await fetchTodoById(id); 
                setTitle(todo.title);
                setDescription(todo.description);
            } catch (error) {
                console.error('Error fetching todo:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadTodo();
        }
    }, [id]);

    const handleUpdateTodo = async () => {
        const updatedTodo = { title, description };
        await updateTodo(id, updatedTodo); 
        router.back();
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        
                    <ImageBackground source={JOO} style={styles.background}>
            <Text style={styles.headerText}>Edit Todo</Text>
            <View >
            <TextInput
                style={styles.input}
                placeholder="Enter new title"
                placeholderTextColor="gray"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter new description"
                placeholderTextColor="gray"
                value={description}
                onChangeText={setDescription}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleUpdateTodo}>
                <Ionicons name="save" size={24} color="white" />
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            </View>
            </ImageBackground>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerText: {
        color: "orange",
        fontSize: 24,
        marginBottom: 30,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        color: 'white',
        padding: 10,
        marginVertical: 10,
        width: 270,
        borderRadius: 5,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3b7d3b',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignSelf:"center",
        width:160
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
    },
    background: {
        flex: 1,
        height:"100%",
        width:"100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
});

export default EditScreen;

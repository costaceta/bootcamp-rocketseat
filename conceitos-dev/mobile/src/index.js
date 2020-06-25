import React, { useState ,useEffect } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import api from './services/api'

export default function App() {
    const [projects, setProjects] = useState([])

    useEffect( () => {
        fetchProjects()
    }, [] )

    const fetchProjects = async () => {
        const response = await api.get('/projects')
        const fetchedProjects = response.data
        setProjects(fetchedProjects)
    }

    const handleAddProject = async () => {
        const response = await api.post('/projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Rafael Costa'
        })

        const project = response.data

        setProjects([
            ...projects,
            project
        ])
    }

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#7159c1"
            />
            <SafeAreaView style={ styles.container }>
                <FlatList
                    data={ projects }
                    keyExtractor={ project => project.id }
                    renderItem={ ({ item: project }) => (
                        <Text style={ styles.title }>
                        { project.title }
                        </Text>
                    ) }
                />

                <TouchableOpacity
                    style={ styles.button }
                    activeOpacity={ 0.6 }
                    onPress={ handleAddProject }
                >
                    <Text style={ styles.buttonText }>
                        Adicionar projeto
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>

            {/* <View style={ styles.container } >
                { projects.map( ({ id, title }) => (
                    <Text key={ id } style={ styles.title }>
                       { title }
                    </Text>
                ) ) }
            </View> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    title: {
        color: '#fff',
        fontSize: 24,
    },
    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
})
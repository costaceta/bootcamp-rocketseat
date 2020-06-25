import React, { useState, useEffect } from "react";
import api from './services/api'
import './App.css'

import { uuid } from 'uuidv4'

import Header from './components/Header'

/**
 * Component
 * Props
 * State & immutability
 */

function App() {

  const [projects, setProjects] = useState()

  useEffect(() => {
    getProjects()
  }, [])

  function getProjects() {
    api.get('projects').then( response => {
      const fetchProjects = response.data

      setProjects(fetchProjects)
    })
  }

  async function handleClickAddProject () {
    const response = await api.post('projects', {
      id: uuid(),
      title: 'Adicionado novo',
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
      <Header title="Projects" >

        <ul>
          { projects && projects.map( ({ title, id }) => (
            <li key={ id }>{ title }</li>
          )) }
        </ul>

        <button type="button" onClick={ handleClickAddProject }>Adicionar projeto</button>
      </Header>
    </>
  );
}

export default App;

import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = event => {
    this.setState({ filters: { type: event.target.value } })
  }

  setPets = pets => {
    this.setState({pets})   // because argument passed in pets and state's name is pets, you don't have to do {pets: pets}
  }

  onFindPetsClick = () => {
    const select = this.state.filters.type
    const url = select === "all" ? 
      '/api/pets' :
      `/api/pets?type=${select}`
    fetch(url) 
      .then(resp => resp.json())
      .then(pets => this.setPets(pets))  // the data from json is an array of Pet objects, this gets updated into state's pets
  }

  onAdoptPet = (id) => {
    const petsCopy = [...this.state.pets] // create a shallow duplicate (i.e. still points to the same array of pets in memory )
    const foundPet = petsCopy.find(pet => pet.id === id)
    const foundPetCopy = JSON.parse(JSON.stringify(foundPet))
    foundPetCopy.isAdopted = true
    // petsCopy.splice(petsCopy.indexOf(foundPet),1, foundPetCopy)
    petsCopy[petsCopy.indexOf(foundPet)] = foundPetCopy  // rather than splicing by removing anf then inserting new foundPetCopy in place
    //        this way actually replaces the indexed foundPet directly - no need to splice
    this.setState ({pets: petsCopy})    
  }


  render() {
    const { onChangeType, onFindPetsClick, onAdoptPet } = this
    const { pets } = this.state
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser  pets={pets} onAdoptPet={onAdoptPet} />    
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

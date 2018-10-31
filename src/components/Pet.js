import React from 'react'

class Pet extends React.Component {
  render() {
    const { pet, onAdoptPet } = this.props
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {pet.gender ===  'female' ? '♀' : '♂' } {pet.name}
          </a>
          <div className="meta">
            <span className="date">{pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {pet.age}</p>
            <p>Weight: {pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
        { // this bit is key to only showing one of the 2 buttons - based on whether isAdopted? (pet property) is truthy or falsey
          pet.isAdopted ? 
            <button className="ui disabled button">You have just adopted {pet.name} 🐶 </button>
            :
            <button className="ui primary button" onClick={() => onAdoptPet(pet.id)} >Adopt pet</button>
        } 
        </div>
      </div>
    )
  }
}

export default Pet

import './App.css';
import { useEffect, useState } from 'react';
import M from "materialize-css";
import Cards from './components/Cards';
import UserData from './data/celebrities.json'
import { DataTypeWithAge, GenderTypes } from './types';

import EditCard from './components/EditCard';
function App() {

  const [data, setdata] = useState<DataTypeWithAge[]>([])
  const [editPerson, setEditPerson] = useState<DataTypeWithAge | undefined>()
  useEffect(() => {
    // materlize init 
    let elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems)
    let elemsmodal = document.querySelectorAll('.modal');
    M.Modal.init(elemsmodal)


    const newuserdata: DataTypeWithAge[] = []
    UserData.forEach((val) => {
      newuserdata.push({
        ...val,
        gender: getGender(val.gender),
        age: getAge(val.dob)
      })
    })
    setdata(newuserdata)


  }, [])



  const getAge = (birthDate: string) => Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e+10)

  const getGender = (g: string) => {
    if (g === 'male') {
      return GenderTypes.male
    }
    else if (g === 'female') {
      return GenderTypes.female
    }
    else if (g === 'other') {
      return GenderTypes.other
    }
    else if (g === 'transgender') {
      return GenderTypes.transgender
    }
    else {
      return GenderTypes.rather_not_say
    }
  }

  const delPerson = (id: number) => {
    setdata(data.filter((prevItem) => prevItem.id !== id))
  }

  const updatePerson = () => {
    let isEmpty = false
    for (const [, value] of Object.entries(editPerson!)) {
      if (value === '') {
        isEmpty = true
        break
      }
    }

    if (isEmpty) {
      M.toast({ html: 'Some fields are missing' })
      return
    }
    if (/^\+?(0|[1-9]\d*)$/.test(editPerson!.country)) {
      M.toast({ html: 'dont insert number as input in country' })
      return
    }

    if (editPerson !== undefined)
      setdata(data.map((p) => { return p.id === editPerson?.id ? editPerson : p }))
    setEditPerson(undefined)
  }

  return (
    <div className="App container">
      <br /><br /><br />
      <ul className="collapsible" data-collapsible="accordion">
        {/* render user data if data is fetched from json */}
        {data && data.map((item) => {
          if (editPerson && item.id === editPerson?.id) {
            return (
              <li className='collection-item' key={editPerson.id}>
                <div className="collapsible-header avatar">
                  <img src={editPerson.picture} alt='pic' className='circle' />
                  <div className='personname'>
                    <input type="text" value={editPerson.first} name="first" onChange={(e) => setEditPerson({ ...editPerson, [e.target.name]: e.target.value })} />
                  </div>
                  <i className="material-icons right">expand_more</i></div>
                <div className="collapsible-body"><span><EditCard person={editPerson} setEditPerson={setEditPerson} getGender={getGender} updatePerson={updatePerson} /></span></div>
              </li>
            )
          }

          return (
            <li className='collection-item' key={item.id}>
              <div className="collapsible-header avatar">
                <img src={item.picture} alt='pic' className='circle' />
                <div className='personname'>
                  {item.first}
                </div>
                <i className="material-icons right">expand_more</i></div>
              {/* don't render in edit mode */}
              {editPerson === undefined && <div className="collapsible-body"><span><Cards person={item} delPerson={delPerson} setEditPerson={setEditPerson} /></span></div>}
            </li>
          )

        })}
      </ul>
    </div>
  );
}



export default App;

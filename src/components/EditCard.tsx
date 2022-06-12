import { useEffect } from 'react';
import { DataTypeWithAge, DispatchEditPerson, GenderTypes, VoidFunctionType } from '../types';

function EditCard({ person, setEditPerson, getGender, updatePerson }: { person: DataTypeWithAge, setEditPerson: DispatchEditPerson, getGender: (x: string) => GenderTypes, updatePerson: VoidFunctionType }) {

    useEffect(() => {
        let elemsselect = document.querySelectorAll('select');
        M.FormSelect.init(elemsselect)
    }, [])

    return (
        <div className="row">

            <div className="input-field col s4">
                <div className='grey-text '>Age</div> <br />
                <input type="number" value={person.age} name="age" onChange={(e) => setEditPerson({ ...person, [e.target.name]: e.target.value })} />
            </div>
            <div className="col s4">
                <div className='grey-text '>Gender</div> <br />
                <div className="input-field col s12">
                    <select onChange={(e) => setEditPerson({ ...person, 'gender': getGender(e.target.value) })} value={person.gender}>
                        {Object.keys(GenderTypes).map((key) => {

                            return (
                                <option value={key} key={key}>{key}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="input-field col s4">
                <div className='grey-text '>Country</div> <br />
                <input type="text" value={person.country} name="country" onChange={(e: any) => setEditPerson({ ...person, [e.target.name]: e.target.value })} />
            </div>
            <br />
            <div className='grey-text left ' style={{ margin: '10px 0 10px 0' }}> Description</div> <br /><br /><br />

            <div className="row">
                <div className="input-field col s12">
                    <textarea id="textarea1" className="materialize-textarea" style={{ height: '100%' }} name='description' onChange={(e: any) => setEditPerson({ ...person, [e.target.name]: e.target.value })} value={person.description} ></textarea>
                </div>
            </div>
            <div className='editicons right'>
                <i className="delete material-icons " title='discard' onClick={() => setEditPerson(undefined)}>highlight_off</i>
                <i className="edit material-icons green-text" title='save' onClick={() => updatePerson()}>check_circle</i>
            </div>
        </div>
    );
}

export default EditCard;
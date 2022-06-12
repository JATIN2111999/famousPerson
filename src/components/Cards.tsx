import { useState } from 'react';
import { DataTypeWithAge, DispatchEditPerson, VoidFunctionIntType } from '../types';
function Cards({ person, delPerson, setEditPerson }: { person: DataTypeWithAge, delPerson: VoidFunctionIntType, setEditPerson: DispatchEditPerson }) {
    const [delthis, setDelthis] = useState<number | undefined>()
    if (delthis) {
        return (
            <div className='center'>
                <h4>Are you sure you want to delete this</h4>
                <button className="white black-text btn" onClick={() => setDelthis(undefined)}>Cancel</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="red btn" onClick={() => delPerson(person.id)}>Delete</button>
            </div>
        )
    }
    return (


        <div className="row">

            <div className="col s4">
                <div className='grey-text '>Age</div> <br />
                {person.age} Years
            </div>
            <div className="col s4">
                <div className='grey-text '>Gender</div> <br />
                {person.gender}
            </div>
            <div className="col s4">
                <div className='grey-text '>Country</div> <br />
                {person.country}
            </div>
            <br />
            <div className='grey-text left ' style={{ margin: '10px 0 10px 0' }}> Description</div> <br /><br /><br />
            <p style={{ padding: '10px 0 10px 0' }}>
                {person.description}
            </p>
            <div className='editicons right'>
                <a className="waves-effect waves-light modal-trigger" href="#del">
                    <i className="delete material-icons red-text " onClick={() => setDelthis(person.id)} title="delete">delete_forever</i>
                </a>

                <a className="waves-effect waves-light modal-trigger" href="#edit"  >
                    <i className="edit material-icons " onClick={() => person.age >= 18 ? setEditPerson(person) : M.toast({ html: 'you are not adult' })} title="edit">edit</i>
                </a>
            </div>
        </div>

    );
}

export default Cards;
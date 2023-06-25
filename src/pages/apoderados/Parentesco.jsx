import AdminLayout from '../../components/plantillas/AdminLayout'
import { useState,useEffect } from 'react';
import axios from 'axios'

function Parentesco(){
    const [parentescos,setParentescos] = useState([])
    const [id,setId] = useState(null)
    const [nombre,setNombre] = useState('')
    const [bandera,setBandera] = useState(false)

    const apiAurl = 'http://127.0.0.1:8000/apoderado/parentesco/'

    useEffect(()=>{
        axios.get(apiAurl)
        .then(res =>{
            console.log(res.data);
            setParentescos(res.data)
            setBandera(false)
        })
    },[bandera])

    function guardar(e){
        e.preventDefault()
        let cod = id
        let datos = {
            parentesco_nombre:nombre
        }
        if(cod > 0){
            //actualizar
        }
        else{
            axios.post(apiAurl,datos)
            .then(res=>{
                console.log(res.data)
                setBandera(true)
                setNombre('')
                setId(null)
            }).catch((error)=>{
                console.log(error.toString())
            })
        }
    }

    return(
        <AdminLayout>
            <>
            <h1>Parentescos</h1>
            <div className="mb-3">
                <form onSubmit={guardar}>
                    <label className="form-label">Nuevo Parentesco</label>
                    <input type="hidden" value={id}/>
                    <input type="text" className="form-control" 
                    id="nombre" 
                    onChange={(e)=>setNombre(e.target.value)}
                    />
                    <br/>
                    <button type="submit" className="btn btn-success">Guardar</button>
                </form>
            </div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Descripción</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {parentescos.map((par)=>{
                        return(
                            <tr>
                                <th scope="row" key={par.id}>{par.parentesco_id}</th>
                                <td>{par.parentesco_nombre}</td>
                                <td>
                                    <button type="button" className="btn btn-primary">Editar</button>
                                    <button type="button" className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
            </>
        </AdminLayout>
    )
}

export default Parentesco;
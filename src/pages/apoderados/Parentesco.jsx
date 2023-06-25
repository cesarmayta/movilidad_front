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

    function mostrar(cod){
        console.log("mostrando codigo " + cod)
        axios.get(apiAurl+cod)
        .then(res=>{
            setId(res.data.parentesco_id)
            setNombre(res.data.parentesco_nombre)
        })
    }

    function guardar(e){
        e.preventDefault()
        let cod = id
        let datos = {
            parentesco_nombre:nombre
        }
        if(cod > 0){
            //actualizar
            console.log(datos)
            axios.put(apiAurl+cod+'/',datos)
            .then(res=>{
                console.log(res.data)
                setNombre('')
                setId(null)
                setBandera(true)
            }).catch((error)=>{
                console.log(error.toString())
            })
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

    function eliminar(cod){
        let rpta = window.confirm("desea eliminar")
        if (rpta){
            axios.delete(apiAurl+cod+'/')
            .then(res=>{
                console.log(res.data)
                setBandera(true)
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
                    id="nombre" value={nombre}
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
                                    <button type="button" 
                                    className="btn btn-primary"
                                    onClick={()=>mostrar(par.parentesco_id)}
                                    >Editar</button>
                                    <button type="button"
                                    className="btn btn-danger"
                                    onClick={()=>eliminar(par.parentesco_id)}
                                    >Eliminar</button>
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
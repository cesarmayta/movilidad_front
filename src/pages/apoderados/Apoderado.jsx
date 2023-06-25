import AdminLayout from '../../components/plantillas/AdminLayout'
import { useState,useEffect } from 'react';
import axios from 'axios'

function Apoderado(){
    const [parentescos,setParentescos] = useState([])
    const [apoderados,setApoderados] = useState([])
    const [bandera,setBandera] = useState(false)

    const apiAurlParentescos = 'http://127.0.0.1:8000/apoderado/parentesco/'
    const apiAurlApoderados = 'http://127.0.0.1:8000/apoderado/apoderado/'
    

    useEffect(()=>{
        axios.get(apiAurlApoderados)
        .then(res =>{
            console.log(res.data);
            setApoderados(res.data)
            setBandera(false)
        })
    },[bandera])

    useEffect(()=>{
        axios.get(apiAurlParentescos)
        .then(res =>{
            console.log(res.data);
            setParentescos(res.data)
            setBandera(false)
        })
    },[])



    return(
        <AdminLayout>
            <>
            <div className="mb-3">
                <form>
                    <label className="form-label">Parentesco</label>
                    <select>
                    {parentescos.map((par,index)=>{
                        return(
                            <option key={index} value={par.parentesco_id}>
                                {par.parentesco_nombre}
                            </option>
                        )
                    })}
                    </select>
                    
                    <button type="submit" className="btn btn-success">Guardar</button>
                </form>
            </div>
            </>
        </AdminLayout>
    )
}

export default Apoderado;
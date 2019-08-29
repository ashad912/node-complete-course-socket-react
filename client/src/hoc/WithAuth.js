import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

const WithAuth = (WrappedComponent) => {

    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        callApi();
    }, [])


    const callApi = async () => {
        try{
            const res = await fetch('/api/ninjas/me')
            console.log(res)
            setLoading(false)
            if(res.status !== 200) {
                throw new Error (res.error)
            }
            setData(await res.json())
        } catch (e) {
            console.log(e);
            setRedirect(true)
        }
    }

    return(props) => {
        if(loading) {
            return null
        }
        if(redirect) {
            return (
                <Redirect to = '/' />
            )
        }
    return ( 
        <React.Fragment>
            <WrappedComponent {...props} data={data} />
        </React.Fragment>
        );
    }
      
}

export default WithAuth
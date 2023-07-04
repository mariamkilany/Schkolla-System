import React , {createContext , useState } from 'react';

export const DataContext = createContext(null);


function ShowDataContext({children}) {
    const [teacherShowId,setTeacherShowId]=useState('')

    return (
        <DataContext.Provider value={{teacherShowId,setTeacherShowId}}>
            {children}
        </DataContext.Provider>
    )
}

export default ShowDataContext

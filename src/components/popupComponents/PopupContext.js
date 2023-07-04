import React , {createContext , useReducer, useState } from 'react';

//create context for popups
export const PopupsContext = createContext(null);



const handleSelectedSubjects=(state,action)=>{
    switch(action.type){
        case 'ADD SUBJECT':
            return(action.newSubject!==''&& !state.includes(action.newSubject))?[...state,action.newSubject]:state
        case 'DELETE SUBJECT':
            return state.filter((subject)=> subject!==action.deletedSubject)
        case 'CLEAR':
            return [];
        default:
            return new Error()
    }
}

const handleTeacherForSub=(state,action)=>{
    var newState=state
    switch(action.type){
        case 'ADD TEACHER':
            if(action.newPair.teacher!==''){
                newState[action.newPair.subject]=action.newPair.teacher;
            }
            return newState
        default:
            return new Error()
    }
}

function PopupContext({children}){

const[selectdSubjects,selectdSubjectsDispatch]=useReducer(handleSelectedSubjects,[])
const[teachersForSub,teachersForSubDidpatch]=useReducer(handleTeacherForSub,{});
const[subjects,setSubjects]=useState([])
return(
    <PopupsContext.Provider value={{selectdSubjects,selectdSubjectsDispatch,teachersForSubDidpatch,subjects,setSubjects}}>
        {children}
    </PopupsContext.Provider>
)
}

export default PopupContext;
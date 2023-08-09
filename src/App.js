import React from "react";
import Form from "./Pages/Form";
import FormB from "./Pages/FormB";
import FormC from "./Pages/FormC";
import FormD from "./Pages/FormD";

function App()
{


      return(
            <div className='app_component'>

            <h1 className='project_name'>To-do list Application : to track all your tasks and progress. </h1>
            
            <div className='form_container'>

                  <Form  className='forms' />  
                  <FormB  className='forms' /> 
                  <FormC  className='forms' /> 
                  <FormD  className='forms' />


            
            </div>
      </div>
            )
}

export default App;

import React, { useContext, useEffect, useState } from  "react"
import { EmployeeContext } from "./EmployeesProvider.js"
import "./Employee.css"
import { useHistory, useParams } from 'react-router-dom'


export const  EmployeeForm = () => {
    const { addEmployee } = useContext(EmployeeContext)




  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

  Define the intial state of the form inputs with useState()
  */

  const [employee, setEmployee] = useState({
    name: "",
    managerId: parseInt(sessionStorage.getItem("managerId")),


  });

  const history = useHistory();

  

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newEmployee = { ...employee }
    /* task is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newEmployee[event.target.id] = event.target.value
    // update state
    setEmployee(newEmployee)
  }

  const handleClickSaveEmployee = (event) => {
    event.preventDefault() //Prevents the browser from submitting the form

    

    
      //Invoke addEmployee passing the new task object as an argument
      //Once complete, change the url and display the tasks list

      const newEmployee = {
          name: employee.name,
          managerId: employee.managerId,

          
        }
        addEmployee(newEmployee)
        .then(() => history.push("/employeeList"))
    }
    
    return (
        <form className="EmployeeForm">
      <h2 className="EmployeeForm__title">New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Employee Name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Employee Name" value={employee.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      
      <button className="btn btn-primary" onClick={handleClickSaveEmployee}>
        Save Employee
          </button>
    </form>
  )
}
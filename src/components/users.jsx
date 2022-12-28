import React, {useState} from "react";
import api from "../api";

const Users=()=>{
    const [users, setUsers]=useState(api.users.fetchAll());
    const handleDelete = (userId)=>{
        setUsers(prevState=>prevState.filter(user=>user._id!==userId))
        }
    const renderPhrase=(number)=>{
        if(number===0){
            return <h1><span className="badge bg-danger">Никто с тобой не тусанет</span></h1>
        } else if (number===1){
            return <h1><span className="badge bg-primary">{number} человек тусанет с тобой сегодня</span></h1>
        } else if (number>=2 && number <=4){
            return <h1><span className="badge bg-primary">{number} человека тусанут с тобой сегодня</span></h1>
        } else{
            return <h1><span className="badge bg-primary">{number} человек тусанут с тобой сегодня</span></h1>
        }
    }
    const spanClass=(item)=>{
      return `badge bg-${item.color} m-2`;        
    }
   
    const renderRows = users.map((user)=>{
        return(
            <>
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.qualities.map((item)=>(
                    <span className={spanClass(item)} key={item._id} >{item.name}</span>
                ))}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td><button type="button" className="btn btn-danger" onClick={()=>handleDelete(user._id)}>delete</button></td>
            </tr>            
            </>
        )
    })

    return (
        <>
        
        {renderPhrase(users.length)}

        {users.length>0?
       
        <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Имя</th>
      <th scope="col">Качества</th>
      <th scope="col">Профессия</th>
      <th scope="col">Встретился, раз</th>
      <th scope="col">Оценка</th>
      <th></th>

    </tr>
  </thead>
  <tbody>       
        {renderRows}
  </tbody>
</table>
: ""}
        </>
    
        
    )
     
}

export default Users;
//jshint esversion: 8
import { API } from "./../../backend";
import { isAuthenticated } from "./../../auth/helper/index";

export const registrationsPerEvent = (setUsersPerEvent) => {
    const { user,  token} = isAuthenticated();
    // this will return registrarion in each event 
    /* 
        output format is an obeject
        {
            eventName: 'name of the event',
            teamCountRegisterd: count,
            teamCountPaid: count
        }  
    */
    return fetch(`${API}admin/api/registrationPerEvent`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        setUsersPerEvent(data.registrationCount);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getUsersCount = (setData) => {
    const { user, token } = isAuthenticated();
    // this will return the total no of teams 
    /* 
        output format is an obeject
        {
            teamCount: "count"
        }  
    */
    return fetch(`${API}admin/api/getUser/count`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        setData(data.usersCount);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getUsersByEvent = (eventId, paidStatus, setData) =>{
    const { user, token } = isAuthenticated();
    //get users according to event and paid status
    /* 
        output fomat is array of all the users object
        [user1, user2]
    */
    return fetch(`${API}admin/api/getUsers/eventId/${eventId}/${paidStatus}`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        setData(data);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getTeamHeads = (eventId, paidStatus, setData) =>{
    const { user, token } = isAuthenticated();
    //get team heads according to paid status and event
    /*
        output format is array of teamhead objects
    */
    return fetch(`${API}admin/api/teamHead/${eventId}/${paidStatus}`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        setData(data);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getTeamHeadsAll = (paidStatus, setData) =>{
    const { user, token } = isAuthenticated();
    return fetch(`${API}admin/api/teamHead/all/${paidStatus}`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log("getTeamHeadsall");
        console.log(data);
        setData(data);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getUserFromEndvrId = (endvrId, setData) =>{
    const { user, token } = isAuthenticated();
    return fetch(`${API}admin/api/getUser/endvId/${endvrId}`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log("getUserFromEndvrId");
        console.log(data);
        setData(data);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getUserFromMobile = (mobile, setData) => {
    const { user, token } = isAuthenticated();
    return fetch(`${API}admin/api/getUser/number/${mobile}`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log("getUserFromMobile");
        console.log(data);
        setData(data);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

export const getUsers = (setData) => {
    const { user, token } = isAuthenticated();
    return fetch(`${API}admin/api/getUser/all`, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    })
    .then(response => {
        if(response.ok){
            return response.json();
        } else {
            throw new Error("Not able to fetch users data");
        }
    })
    .then(data => {
        setData(data.usersData);
        return;
    })
    .catch(error => {
        console.log(error);
    });
};

// export const getUsersAll = (setData) => {
//     const { user, token } = isAuthenticated();
//     return fetch(`${API}admin/api/getUser/all/all`, {
//         mode: "cors",
//         method: "GET",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `${token}`
//         }
//     })
//     .then(response => {
//         return response.json();
//     })
//     .then(data => {
//         setData(data);
//         return;
//     })
//     .catch(error => {
//         console.log(error);
//     });
// };

export const updatepaidstatuseventbymail = data => {
    const { user,  token} = isAuthenticated();
    return fetch(`${API}admin/changeeventpaidstatusbyemail`, {
        mode: "cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        },
        body: JSON.stringify({
            email: data 
        })
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        console.log(error);
    });
}

export const updatepaidstatuseventbyphone = data => {
    const { user,  token} = isAuthenticated();
    return fetch(`${API}admin/changeeventpaidstatusbyphone`, {
        mode: "cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        },
        body: JSON.stringify({
            phoneNumber: data 
        })
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
        console.log(error);
    });
}

export const updatepaidstatusinternshipbymail = data => {
    const { user,  token} = isAuthenticated();
    return fetch(`${API}admin/changeinternshippaidstatusbyemail`, {
        mode: "cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        },
        body: JSON.stringify({
            email: data 
        })
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        console.log(error);
    });
}

export const updatepaidstatusinternshipbyphone = data => {
    const { user,  token} = isAuthenticated();
    return fetch(`${API}admin/changeinternshippaidstatusbyphone`, {
        mode: "cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        },
        body: JSON.stringify({
            phoneNumber: data 
        })
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        console.log(error);
    });
}


export const queryDataBase = (options, setData) => {

    const { user, token } = isAuthenticated();

    fetch(`${API}admin/api/userData/getUserData/custom/${options.key}/${options.value}`, {
        mode: "cors",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${token}`
        }
    }).then(response => {
        if(response.ok){
            return response.json();
        } else {
            throw new Error("Not able to fetch user data");
        }
    }).then(data => {
        setData(data.usersData);
    }).catch(error => {
        console.log(error);
    });
};

export const updateUserData = (userId, updatedData) => {
    const { user, token } = isAuthenticated();

    return fetch(`${API}admin/api/userData/updateUserData`, {
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${token}`
        },
        body: JSON.stringify({
            userId: userId,
            updatedData: updatedData
        })
    }).then(response => {
        return response.json();
    })
    .catch(error => {
        console.log(error);
    });
};

export const deleteUserData = (userId) => {

    const { user, token } = isAuthenticated();

    return fetch(`${API}admin/api/userData/deleteUser/${userId}`, {
        mode: "cors",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};

export const getGeneralEventData = (setGeneralData) => {
    
    const { user, token } = isAuthenticated();

    return fetch(`${API}admin/api/eventsData/eventStatus`, {
        mode: "cors",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${token}`
        }
    }).then(response => {
        if(response.ok){
            return response.json();
        } else {
            throw new Error("Not able to fetch users Data");
        }
    }).then(data => {
        setGeneralData(data.data);
        return;
    }).catch(err => {
        console.log(err);
    });

}; 

export const getUsersPerYear = (setUsersPerYear) => {

    const { user, token } = isAuthenticated();

    return fetch(`${API}admin/api/userData/getuserbyyear`, {
        mode: "cors",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${token}`
        }
    }).then(response => {
        if(response.ok){
            return response.json();
        } else {
            throw new Error("Not able to fetch users Data");
        }
    }).then(data => {
        setUsersPerYear(data.usersCount);
        return;
    }).catch(err => {
        console.log(err);
    });
};

export const findTeamUsingId = (endeavourId) => {
    const { user, token } = isAuthenticated();

    return fetch(`${API}admin/api/teamData/leaderId/${endeavourId}`, {
        mode: "cors",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const deleteTeamFomId = (teamId) => {
    const { user, token } = isAuthenticated();

    return fetch(`${API}admin/api/teamData/deleteTeam/${teamId}`, {
        mode: "cors",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};

export const findTeamsAll = () => {
    const { user, token } = isAuthenticated();
    
    return fetch(`${API}admin/api/teamData/getTeams/all`, {
        mode: "cors",
        method: "GET",
        headers : {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};

export const createNewTeam = (teamData) => {
    const { user, token } = isAuthenticated();

    return fetch(`${API}admin/api/teamData/createNewTeam`, {
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${token}`
        },
        body: {
            teamData
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        if(err){
            console.log(err);
        }
    });
};

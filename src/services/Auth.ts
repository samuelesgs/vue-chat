import CrudService from "@/services/Crud";

class AuthService {
    
    async login( email : string, password : string) : Promise<any> {
        return new Promise((resolve, reject) => {
            CrudService.login(email, password).then(response => {
                const responseData : ResponseSync = response.data;
                if (responseData.status == 1) {
                    this.setStorage(responseData.data);
                    resolve(true);
                } else {
                    reject(responseData.message);
                }
            });
        });
    }

    async create(email : string, password : string, name : string) : Promise<any> {
        return new Promise((resolve, reject) => {
            CrudService.createUser(email, password).then(response => {
                const responseData : ResponseSync = response.data;
                if (responseData.status == 1) {
                    resolve(true);
                } else {
                    reject(responseData.message)
                }
            })
        });
    }

    setStorage(data : User) {
        localStorage.setItem('user_session', JSON.stringify(data));
        localStorage.setItem('email', data.email);
        localStorage.setItem('id', data._id);
    }
}

export interface ResponseSync {
    data:    User;
    status:  number;
    message: string;
};

interface User {
    _id:       string;
    email:     string;
    password:  string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
};

export default new AuthService();
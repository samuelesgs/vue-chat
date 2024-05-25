import axios from "axios";

class CrudService {
    
    url : string = "http://localhost:3000/";

    async login( email : string, password : string) :Promise<any> {
        return await this.sendRequestPostNotAuth("auth/login", {email : email, password : password});
    }

    async createUser(email : string, password : string) : Promise<any> {
        return await this.sendRequestPostNotAuth("auth/register", {email : email, password : password});
    }

    sendRequestPostNotAuth(section : string, params : {}) : any {
        return axios.post(`${this.url}${section}`, params);
    }
}

export default new CrudService();
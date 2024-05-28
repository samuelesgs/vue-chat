import type { SendMessage } from "@/types/Interfaces";
import axios from "axios";

class CrudService {
    
    url : string = "http://localhost:3000/";
    email : string | null = localStorage.getItem('email') ?? null;


    async login( email : string, password : string) :Promise<any> {
        return await this.sendRequestPostNotAuth("auth/login", {email : email, password : password});
    }

    async createUser(email : string, password : string) : Promise<any> {
        return await this.sendRequestPostNotAuth("auth/register", {email : email, password : password});
    }

    async syncMessages(){
        return await this.sendRequestGetNotAuth("messages/sync/", `email=${this.email}`);
    }

    async get(section : string, complementUrl : string) {
        return await this.sendRequestGetNotAuth(section, complementUrl);
    }

    sendRequestPostNotAuth(section : string, params : {}) : any {
        return axios.post(`${this.url}${section}`, params);
    }

    sendRequestGetNotAuth(section : string, complementUrl : string) {
        return axios.get(`${this.url}${section}?${complementUrl}`);
    }

   async sendMessageFile(formData : SendMessage) {
        const response = await axios.post('https://your-api-endpoint.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    }
}
export default new CrudService();
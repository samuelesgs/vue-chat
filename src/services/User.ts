import CrudService from "@/services/Crud";
import type { DataMessages, ResponseFindUser, User } from "@/types/Interfaces";

class UserService {
    async findByEmail(anotherEmail : string) {
        const myEmail = localStorage.getItem('email');
        return new Promise((resolve, reject) => {
            CrudService.get('users/find-email', `my-email=${myEmail}&another-email=${anotherEmail}`).then(response => {
                const responseData : ResponseFindUser = response.data;
                if (responseData.status == 1) {
                    resolve(true);
                } else {
                    reject(responseData.message)
                }
            });
        });
    }

    async fileProfile(params : any) {
        return new Promise((resolve, reject) => {
            CrudService.post(`users/fileProfile/?email=${CrudService.email}`, params).then(response => {
                const responseData : ResponseImgProfile = response.data;
                if (responseData.status == 1) {
                    localStorage.setItem('img', responseData.data.img!);
                    resolve(true);
                } else {
                    reject(responseData.message)
                }
            });
        });
    }

    async updateProfile(params : any) {
        
    }
}
export interface ResponseImgProfile {
    data:    User;
    status:   number;
    message: string;
}
export default new UserService();

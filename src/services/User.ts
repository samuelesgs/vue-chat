import CrudService from "@/services/Crud";
import type { DataMessages, ResponseFindUser } from "@/types/Interfaces";

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
}
export default new UserService();

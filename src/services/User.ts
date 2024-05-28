import CrudService from "@/services/Crud";
import type { DataMessages, ResponseFindUser } from "@/types/Interfaces";

class UserService {
    async findByEmail(email : string) {
        return new Promise((resolve, reject) => {
            CrudService.get('users/find-email', `email=${email}`).then(response => {
                const responseData : ResponseFindUser = response.data;
                if (responseData.status == 1) {
                    resolve(true);
                } else {
                    reject(false)
                }
            });
        });
    }
}
export default new UserService();

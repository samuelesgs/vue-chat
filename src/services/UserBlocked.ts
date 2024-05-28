import CrudService from "@/services/Crud";

class UserBlockedService {

    async sendRequest(anotherEmail : string) {
        const params = {
            'emailOwner' : CrudService.email,
            'emailBlock' : anotherEmail
        };
        return new Promise((resolve, reject) => {
            CrudService.post('user-blocked', params).then(response => {
                const responseData = response.data;
                if (responseData.status == 1) {
                    resolve(true);
                } else {
                    reject(false)
                }
            });
        });
    }
}


export default new UserBlockedService();
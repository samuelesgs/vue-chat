import CrudService from "@/services/Crud";

class UserBlockedService {

    private usersBlocked : string[] = [];

    getUsersBlocked() {
        return [...this.usersBlocked];
    }

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

    async getList() {
        return new Promise((resolve, reject) => {
            CrudService.get('user-blocked/getList', `myEmail=${CrudService.email}`).then(response => {
                const responseData : ResponseUserBlocked = response.data;
                if (responseData.status == 1) {
                    this.usersBlocked = responseData.data.emailList;
                    resolve(true);
                } else {
                    reject(false)
                }
            });
        });
    }

    async sendRequestRemove(emailBlocked : string) {
        return new Promise((resolve, reject) => {
            CrudService.delete('user-blocked', `myEmail=${CrudService.email}&anotherEmail=${emailBlocked}`).then(response => {
                const responseData : ResponseUserBlocked = response.data;
                if (responseData.status == 1) {
                    this.usersBlocked = this.usersBlocked.filter(row => row != emailBlocked);
                    resolve(true);
                } else {
                    reject(false)
                }
            });
        }); 
    }
}

export interface ResponseUserBlocked {
    data:    Data;
    status:  number;
    message: string;
}

export interface Data {
    _id:        string;
    emailOwner: string;
    emailList:  string[];
    createdAt:  Date;
    updatedAt:  Date;
    __v:        number;
}

export default new UserBlockedService();
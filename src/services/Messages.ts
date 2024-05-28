import CrudService from "@/services/Crud";
import type { DataMessages, Message } from "@/types/Interfaces";

class MessagesService {

    private chat : DataMessages[] = [];

    public getChats() : DataMessages[] {
        return [...this.chat];
    }
    
    async sync() {
        return new Promise((resolve, reject) => {
            CrudService.syncMessages().then(response => {
                const responseData : ResponseSync =  response.data;
                if (responseData.status == 1) {
                    this.chat = responseData.data;
                    resolve(true);
                } else {
                    reject(responseData.message)
                }
            });
        });
    }

    async sendFile(params : any) {
        return new Promise((resolve, reject) => {
            CrudService.post('messages/uploadFile', params).then(response => {
                const responseData : ResponseUploadFile = response.data;
                if (responseData.status == 1) {
                    resolve(true);
                } else {
                    reject(responseData.message)
                }
            });
        });
    }

}



export interface ResponseSync {
    data:    DataMessages[];
    status:  number;
    message: string;
}

export interface ResponseUploadFile {
    data:    Message;
    message: string;
    status:  number;
}

export default new MessagesService();
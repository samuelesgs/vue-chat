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

    async downloadFile(fileName : string) {
        const response = await CrudService.downloadFile(fileName);
        const windowUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = windowUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    async delete(id : string) {
        return new Promise((resolve, reject) => {
            CrudService.delete('messages', `id=${id}`).then(response => {
                const responseData : ResponseDelete =  response.data;
                if (responseData.status == 1) {
                    resolve(true);
                } else {
                    reject(responseData.message)
                }
            });
        });
    }

}



export interface ResponseDelete {
    data:    Message;
    status:  number;
    message: string;
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
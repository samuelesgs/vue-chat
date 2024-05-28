export default interface Login {
    email: string;
    password: string;
}

export interface Message {
    _id:       string;
    content:   string;
    datetime:  Date;
    status:    number;
    delete:    number;
    send_by:   string;
    send_to:   string;
    type:      string;
    filename:  null;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

export interface DataMessages {
    another_email: string;
    another_img:   null;
    my_email:      string;
    messages:      Message[];
    lastMessage?: Message;
}

export interface ResponseMessage {
    data:    Message;
    status : number;
    message: string;
}

export interface SendMessage {
    content?: string;
    type: string; // message, png, pegj, pdf
    send_by : string;
    send_to: string;
    filename?: string | null;
}

export interface NewMessage {
    send_to : string;
    message : string;
}

export interface ResponseFindUser {
    message: string;
    data:    User;
    status:  number;
}

export interface User {
    _id:       string;
    email:     string;
    password:  string;
    img:       null;
    id_socket: string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}
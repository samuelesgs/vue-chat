export default interface Login {
    email: string;
    password: string;
}

export default interface User {
    _id:       string;
    email:     string;
    password:  string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
};

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
}

export interface ResponseMessage {
    data:    Message;
    message: string;
}

export interface SendMessage {
    content: string;
    type: string; // message, png, pegj, pdf
    send_by : string;
    send_to: string;
    filename?: string | null;
}
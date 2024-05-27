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

export default interface ResponseData {
  data: any;
}

export interface Chats  {
    message : string;
    property : boolean;
    date : string;
    user_send : string;
    user_to : string;
};

export interface DataMessages {
    another_email: string;
    another_img:   null;
    my_email:      string;
    messages:      Message[];
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
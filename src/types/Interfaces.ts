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
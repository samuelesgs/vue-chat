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
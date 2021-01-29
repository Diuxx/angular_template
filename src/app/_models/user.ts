import { Role } from "./role";

export class User {
    public Id: number;
    public Pseudo: string;
    public Mail: string;
    public Password: string;
    public Token: string;
    public Role?: Role;
}
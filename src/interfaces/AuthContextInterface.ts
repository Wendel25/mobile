type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

export interface SignInProps {
    email: string;
    password: string;
}

export interface AuthContextInterface {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
}
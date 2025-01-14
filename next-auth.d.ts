declare module "next-auth" {
    interface Session {
        user: {
          id: string;
          name?: string;
          email?: string;
          image?: string;
        };
    }
    
    interface Session {
        id: string
    }

    interface jwt {
        id: string
    }
}
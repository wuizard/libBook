declare global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGODB_URL: string;
        PORT: number;
      }
    }
}
export {}
  
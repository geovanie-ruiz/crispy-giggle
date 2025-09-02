export {};

// Create a type for the roles
export type Roles = "admin" | "creator" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}

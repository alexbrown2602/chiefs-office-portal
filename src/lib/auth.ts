"use client";

const AUTH_KEY = "takla_auth_user";

export interface AuthUser {
  name: string;
  email: string;
  role: string;
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem(AUTH_KEY);
}

export function login(email: string, _password: string): AuthUser {
  const user: AuthUser = {
    name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Chief French",
    email,
    role: "Chief's Office",
  };
  if (email.toLowerCase().includes("chief") || email === "demo@takla.ca") {
    user.name = "Chief French";
  }
  setStoredUser(user);
  return user;
}

export function signup(name: string, email: string, _password: string): AuthUser {
  const user: AuthUser = {
    name,
    email,
    role: "Team Member",
  };
  setStoredUser(user);
  return user;
}

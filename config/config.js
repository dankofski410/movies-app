export const HOST = "localhost"; // Use your test host
export const USER = "root"; // Use your host username
export const PASSWORD = ""; // Use your host password
export const DB = "movies"; // DB I created to use
export const dialect = "mysql";
export const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};
declare namespace Express {
  export interface Request {
    user: any; // we can change this by providing actual User type to this user property
    called_inside_controller: boolean = false;
  }
}

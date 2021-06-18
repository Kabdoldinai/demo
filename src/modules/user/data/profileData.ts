export interface ProfilesList {
  uuid: string;
  fullName: string;
  firstName: string;
  lastName: string;
  birthday: string;
}
export interface ProfileAddForm {
  firstName: string;
  lastName: string;
  birthday: string;
  user: string;
}
export interface ProfileChangeData {
  firstName: string;
  lastName: string;
  birthday: string;
  profileUuid: string;
  user: string;
}
export interface ProfileData {
  uuid: string;
  fullName: string;
  firstName: string;
  lastName: string;
  birthday: string;
}
export interface Search {
  fullName: string;
  user: string;
}


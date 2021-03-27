import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  processFirestoreObject(docObject: any) {
    const data = docObject.data() as any;
    Object.keys(data).filter((key) => data[key] instanceof Timestamp).forEach(key => data[key] = data[key].toDate())
    data.identifier = docObject.id;
    return data;
  }
}

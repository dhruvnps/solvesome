import { getFirestore, getDoc, doc } from "firebase/firestore";

class DBService {

  getDocRef(collection, ID) {
    const db = getFirestore();
    return doc(db, collection, ID);
  }

  async getProblem(ID) {
    return await getDoc(this.getDocRef("Problems", ID));
  }

  async getUser(ID) {
    return await getDoc(this.getDocRef("Users", ID));
  }

}

export default new DBService();
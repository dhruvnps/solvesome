import { getDoc, getDocs, doc, collection } from "firebase/firestore";
import { db } from "@/firebase";

class DBService {

  async getProblem(ID) {
    return await getDoc(doc(db, "Problems", ID));
  }

  async getUser(ID) {
    return await getDoc(doc(db, "Users", ID));
  }

  async getProblems() {
    return await getDocs(collection(db, "Problems"));
  }

}

export default new DBService();
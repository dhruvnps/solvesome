import { getFirestore, getDoc, getDocs, doc, collection } from "firebase/firestore";

class DBService {

  async getProblem(ID) {
    return await getDoc(doc(getFirestore(), "Problems", ID));
  }

  async getUser(ID) {
    return await getDoc(doc(getFirestore(), "Users", ID));
  }

  async getProblems() {
    return await getDocs(collection(getFirestore(), "Problems"));
  }

}

export default new DBService();
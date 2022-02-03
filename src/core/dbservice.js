import { getDoc, getDocs, doc, collection, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { User } from "@/core/user";
// import { Problem } from "@/core/problem";

class DBService {

  async getProblem(id) {
    return await getDoc(doc(db, "Problems", id));
  }

  async getUser(id) {
    var docSnap = await getDoc(doc(db, "Users", id));
    var user = new User(docSnap.data().name, id)
    user.problemids = docSnap.data().problemids
    return user
  }

  async getProblems() {
    return await getDocs(collection(db, "Problems"));
  }

  async createUser(user) {
    await setDoc(doc(db, "Users", user.uid), {
      name: user.name,
      uid: user.uid,
      problemids: user.problemids,
    });
  }

  async createProblem() {

  }

}

export default new DBService();
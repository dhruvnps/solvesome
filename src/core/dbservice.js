import { getDoc, getDocs, doc, collection, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { User } from "@/core/user";
import { Problem } from "@/core/problem";

class DBService {

  getProblemFromData(data, id) {
    return new Problem(
      data.title,
      data.description,
      data.uid,
      data.solutionIds,
      data.tests,
      id,
    );
  }

  async getProblem(id) {
    var docSnap = await getDoc(doc(db, "Problems", id));
    var data = docSnap.data();
    return this.getProblemFromData(data, id)
  }

  async getAllProblems() {
    var problems = [];
    var col = await getDocs(collection(db, "Problems"));
    for (var docSnap of col.docs) {
      var data = docSnap.data()
      problems.push(this.getProblemFromData(data, docSnap.id));
    }
    return problems;
  }

  async createProblem(problem) {
    await setDoc(doc(db, "Problems", problem.id), {
      title: problem.title,
      description: problem.description,
      uid: problem.uid,
      tests: problem.tests,
      solutionIds: problem.solutionIds,
    });
  }

  async getUser(uid) {
    var docSnap = await getDoc(doc(db, "Users", uid));
    var data = docSnap.data();
    return new User(
      data.name,
      uid,
      data.problemIds,
    );
  }

  async createUser(user) {
    await setDoc(doc(db, "Users", user.uid), {
      name: user.name,
      uid: user.uid,
      problemIds: user.problemIds,
    });
  }

}

export default new DBService();
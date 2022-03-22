import { getDoc, getDocs, doc, collection, setDoc, query, where, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { User } from "@/core/user";
import { Problem } from "@/core/problem";
import { Code } from "@/core/code";

class DBService {

  async getProblem(id) {
    var docSnap = await getDoc(doc(db, "Problems", id));
    var data = docSnap.data();
    return new Problem(
      data.title,
      data.description,
      data.uid,
      data.tests,
      id,
    );
  }

  async getAllProblems() {
    var problems = [];
    var col = await getDocs(collection(db, "Problems"));
    for (var docSnap of col.docs) {
      var data = docSnap.data()
      problems.push(new Problem(
        data.title,
        data.description,
        data.uid,
        data.tests,
        docSnap.id,
      ));
    }
    return problems;
  }

  async getUserCreatedProblems(uid) {
    var problems = [];
    var col = await getDocs(query(collection(db, "Problems"),
      where("uid", "==", uid),
    ));
    for (var docSnap of col.docs) {
      var data = docSnap.data()
      problems.push(new Problem(
        data.title,
        data.description,
        data.uid,
        data.tests,
        docSnap.id,
      ));
    }
    return problems;
  }

  async getUserAttemptedProblems(uid) {
    var problems = [];
    var codes = await getDocs(query(collection(db, "Codes"),
      where("uid", "==", uid),
      where("codeBlock", "!=", "function solution(input) {}"),
    ));
    for (var codeSnap of codes.docs) {
      var problemId = codeSnap.data().problemId;
      var docSnap = await getDoc(doc(db, "Problems", problemId));
      var data = docSnap.data();
      problems.push(new Problem(
        data.title,
        data.description,
        data.uid,
        data.tests,
        problemId,
      ));
    }
    return problems;
  }

  async createProblem(problem) {
    await setDoc(doc(db, "Problems", problem.id), {
      title: problem.title,
      description: problem.description,
      uid: problem.uid,
      tests: problem.tests,
    });
  }

  async getUser(uid) {
    var docSnap = await getDoc(doc(db, "Users", uid));
    var data = docSnap.data();
    return new User(
      data.name,
      uid,
    );
  }

  async createUser(user) {
    await setDoc(doc(db, "Users", user.uid), {
      name: user.name,
      uid: user.uid,
    });
  }

  async getUserProblemCode(uid, problemId) {
    var col = await getDocs(query(collection(db, "Codes"),
      where("uid", "==", uid),
      where("problemId", "==", problemId)
    ));
    var code;
    if (!col.docs.length) {
      code = new Code(uid, problemId);
      this.createCode(code)
      return code;
    } else {
      var docSnap = col.docs[0];
      var data = docSnap.data();
      code = new Code(
        uid,
        problemId,
        data.isSubmitted,
        docSnap.id,
      );
      code.setCode(data.codeBlock);
      return code;
    }
  }

  async getSubmittedProblemCodes(problemId) {
    var codes = [];
    var col = await getDocs(query(collection(db, "Codes"),
      where("problemId", "==", problemId),
      where("isSubmitted", "==", true)
    ));
    for (var docSnap of col.docs) {
      var data = docSnap.data();
      var code = new Code(
        data.uid,
        problemId,
        data.isSubmitted,
        docSnap.id,
      );
      code.setCode(data.codeBlock);
      codes.push(code);
    }
    return codes;
  }

  async createCode(code) {
    await setDoc(doc(db, "Codes", code.id), {
      uid: code.uid,
      problemId: code.problemId,
      isSubmitted: code.isSubmitted,
      codeBlock: code.codeBlock,
    })
  }

  async updateCode(code) {
    await updateDoc(doc(db, "Codes", code.id), {
      isSubmitted: code.isSubmitted,
      codeBlock: code.codeBlock,
    });
  }

}

export default new DBService();
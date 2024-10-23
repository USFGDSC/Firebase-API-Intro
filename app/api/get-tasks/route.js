import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET(req) {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      task: doc.data().task,
    }));
    
    return new Response(JSON.stringify({ success: true, tasks }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Failed to fetch tasks" }), { status: 500 });
  }
}

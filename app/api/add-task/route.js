import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export async function POST(req) {

    try {
      const body = await req.json();
      const { task } = body;

      const docRef = await addDoc(collection(db, "tasks"), {
        task,
        createdAt: new Date().toISOString()
      })
      return new Response(JSON.stringify({ success: true, message: "Successfully added task", id: docRef.id }), { status: 200 });
    } catch (error) {
      console.error("Error adding document: ", error);
      return new Response(JSON.stringify({ success: false, message: "Failed to add task" }), { status: 500 });
    }
}
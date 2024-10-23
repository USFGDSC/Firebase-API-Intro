import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export async function POST(req) {

    try {
      const body = await req.json();
      const { task } = body;

      const docRef = await addDoc(collection(db, "tasks"), {
        task,
        createdAt: new Date().toLocaleDateString("en-US", {
          year: 'numeric',   // Four-digit year (e.g., "2024")
          month: 'long',     // Full name of the month (e.g., "October")
          day: 'numeric',    // Day of the month (e.g., "23")
          hour: '2-digit',   // Hour in 12-hour format (e.g., "02")
          minute: '2-digit', // Minute (e.g., "35")
          second: '2-digit', // Second (e.g., "15")
          hour12: true  
        })
      })
      return new Response(JSON.stringify({ success: true, message: "Successfully added task", id: docRef.id }), { status: 200 });
    } catch (error) {
      console.error("Error adding document: ", error);
      return new Response(JSON.stringify({ success: false, message: "Failed to add task" }), { status: 500 });
    }
}
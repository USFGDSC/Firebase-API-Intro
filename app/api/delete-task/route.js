import { db } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    // Validate the ID
    if (!id) {
      return new Response(JSON.stringify({ success: false, message: "Invalid task ID" }), { status: 400 });
    }

    // Create a reference to the document to delete
    const docRef = doc(db, "tasks", id);
    
    // Delete the document
    await deleteDoc(docRef);

    // Respond with success
    return new Response(JSON.stringify({ success: true, message: "Task deleted successfully" }), { status: 200 });
    
  } catch (error) {
    console.error("Error deleting document: ", error);
    return new Response(JSON.stringify({ success: false, message: "Failed to delete task" }), { status: 500 });
  }
}

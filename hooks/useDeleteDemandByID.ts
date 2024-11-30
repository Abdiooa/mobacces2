import { useState } from "react";
import { apiRequest } from "@/utils/api"; // Adjust the import if needed

const useDeleteDemandByID = () => {
  console.log("delete by id function entered");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteDemandByID = async (demandId: string) => {
    console.log("delete demand by id entered");
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await apiRequest<{ message: string }>(
        `/post/${demandId}`,
        "DELETE"
      );

      

      // Assuming success is indicated by a 200 response and a success message
      if (response.message === "Demand deleted successfully") {
        setSuccess(true); // Mark as successful
        console.log("Demand deleted successfully:", response);
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete demand");
      console.error("Error deleting demand:", err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteDemandByID, loading, error, success };
};

export default useDeleteDemandByID;

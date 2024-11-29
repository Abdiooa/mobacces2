import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import urls from "@/constant/urls";

const useMobileIDStatusCheck = () => {
  const checkStatus = async (clientId: string, keyval: string) => {
    console.log("check status entered");
    const options: AxiosRequestConfig = {
      method: "POST",
      url: urls.STATUSAPI_URL,
      headers: {
        "Content-Type": "application/json",
        MobileIDAuthorization: urls.MOBILEIDAUTHORIZATION,
      },
      data: { client_id: clientId, keyval },
      timeout: 20000,
    };

    const response = await axios.request(options);

    while (true) {
      const response = await axios.request(options);
      console.log(response.data);
      //|| response.data.code == 801
      if (response.data.code === 800 || response.data.code == 801) {
        return true;
      }
      if (response.data.code !== 801) {
        // return true;
        throw new Error(response.data.message || "Status check failed.");
      }
      await new Promise((resolve) => setTimeout(resolve, 20000)); // Wait before retrying
    }
  };

  return { checkStatus };
};

export default useMobileIDStatusCheck;

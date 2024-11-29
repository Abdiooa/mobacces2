import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import urls from "@/constant/urls";

const useMobileIDAuth = () => {
  const [data, setData] = useState<any>(null);

  const authenticate = async (clientId: string) => {
    console.log("authentication function entered");
    const options: AxiosRequestConfig = {
      method: "POST",
      url: urls.API_URL,
      headers: {
        "Content-Type": "application/json",
        WebMobileIDAuthorization: urls.WEBMOBILEIDAUTHORIZATION,
        Org: urls.ORG.toString(),
      },
      data: { client_id: clientId },
      timeout: 10000,
    };

    const response = await axios.request(options);
    console.log(response.data);
    if (response.data.code === 703 && response.data.data?.keyval) {
      setData(response.data);
      return response.data.data.keyval;
    } else {
      throw new Error(response.data.message || "Authentication failed.");
    }
  };

  return { data, authenticate };
};

export default useMobileIDAuth;

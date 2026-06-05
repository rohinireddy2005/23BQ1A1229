import axios from "axios";

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

const TOKEN = "YOUR_ACCESS_TOKEN";

export const fetchNotifications = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data.notifications;
  } catch (error) {
    console.error(error);
    return [];
  }
};
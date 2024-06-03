import { http } from "./http";

const createRoom = async (): Promise<string> => {
    const response = await http.post('/rooms');
    return response.data.roomId;
}

export default createRoom;
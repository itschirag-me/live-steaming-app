import axios from "axios";

export const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2YmU0ZjJmMy1iMmUxLTQ2ZGMtODFhNi01ZDFhMzIwNTMzYmUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNzM5OTE4NSwiZXhwIjoxNzE4MDAzOTg1fQ.LEs6naC81Topmi0IP2KcxwoPC4dHvpA9hCf2rVjK5ho';

export const http = axios.create({
    baseURL: 'https://api.videosdk.live/v2',
    headers: {
        'Authorization': `${authToken}`
    }
});
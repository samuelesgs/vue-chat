import { reactive } from "vue";
import { io } from "socket.io-client";

    export const state = reactive({
        connected: false,
        fooEvents: [],
        barEvents: []
    });

    const url = "http://localhost:3000"
    
    export const socket = io(url, {
        extraHeaders: {
          email: localStorage.getItem('email')!
        }
      });
  
    socket.on("connect", () => {
        state.connected = true;
    });
    
  socket.on("disconnect", () => {
    state.connected = false;
  });
  
  export function sendMessage(params : any) {
    socket.emit('message', params);
  }
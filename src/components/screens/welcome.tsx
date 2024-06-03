import { useAppData } from "@/context/AppProvider";
import { Button } from "../ui/button";
import createRoom from "@/services/create-room";
import { Constants } from "@videosdk.live/react-sdk";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateRoomSchema = z.object({
  roomId: z.string().min(1, { message: "Room ID is required" }),
});

const Welcome = () => {
  const { setAppData } = useAppData();

  const form = useForm<z.infer<typeof CreateRoomSchema>>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      roomId: "",
    },
  });

  const handleCreateRoom = async () => {
    try {
      const roomId = await createRoom();
      setAppData({ meetingId: roomId, mode: Constants.modes.CONFERENCE });
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinRoom = (data: z.infer<typeof CreateRoomSchema>) => {
    setAppData({ meetingId: data.roomId, mode: Constants.modes.VIEWER });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center gap-x-4">
        <Button size="sm" onClick={handleCreateRoom}>
          Create Room
        </Button>
        <span>|</span>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              Play in existing room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleJoinRoom)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="roomId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter room id" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Join</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Welcome;

import React from "react";
import { Button } from "./ui/button";
import { Coins } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-around w-full h-36 container">
      <Button>Bet</Button>
      <Button size="icon">
        <Coins className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Dashboard;

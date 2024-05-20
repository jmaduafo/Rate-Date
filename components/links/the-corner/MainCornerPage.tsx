import React from "react";
import MainLeftBar from "./MainLeftBar";
import MainRightBar from "./MainRightBar";

function MainCornerPage() {
  return (
    <div className="flex gap-6">
      <div className="flex-[3]">
        <MainLeftBar />
      </div>
      <div className="flex-[1]">
        <MainRightBar />
      </div>
    </div>
  );
}

export default MainCornerPage;

import React from "react";
import MainLeftBar from "./MainLeftBar";
import MainRightBar from "./MainRightBar";

function MainCornerPage() {
  return (
    <div className="md:flex md:gap-6">
      <div className="md:flex-[3] overflow-x-hidden">
        <MainLeftBar />
      </div>
      <div className="md:flex-[1] md:block hidden">
        <MainRightBar />
      </div>
    </div>
  );
}

export default MainCornerPage;
